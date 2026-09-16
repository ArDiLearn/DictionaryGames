const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const WORDS_PATH = path.join(__dirname, '../src/data/words.json');
const AUDIO_DIR = path.join(__dirname, '../public/audio/lv');
const MAP_OUTPUT_PATH = path.join(__dirname, '../src/data/lvAudioMap.json');

// Ensure output directories exist
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

function getAudioHash(text) {
  return crypto.createHash('md5').update(text.toLowerCase().trim()).digest('hex').slice(0, 12);
}

function downloadAudio(text, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    const url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=lv&q=' + encodeURIComponent(text);

    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        if (retries > 0) {
          setTimeout(() => {
            downloadAudio(text, destPath, retries - 1).then(resolve).catch(reject);
          }, 500);
          return;
        }
        reject(new Error(`Failed with status ${res.statusCode} for "${text}"`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        const stat = fs.statSync(destPath);
        if (stat.size < 100) {
          fs.unlinkSync(destPath);
          if (retries > 0) {
            setTimeout(() => {
              downloadAudio(text, destPath, retries - 1).then(resolve).catch(reject);
            }, 500);
            return;
          }
          reject(new Error(`File too small (${stat.size} bytes) for "${text}"`));
          return;
        }
        resolve(stat.size);
      });
    });

    req.on('error', (err) => {
      if (retries > 0) {
        setTimeout(() => {
          downloadAudio(text, destPath, retries - 1).then(resolve).catch(reject);
        }, 500);
      } else {
        reject(err);
      }
    });
  });
}

async function run() {
  console.log('🇱🇻 Generating high-quality native Latvian audio files...');
  if (!fs.existsSync(WORDS_PATH)) {
    console.error('Words JSON not found at', WORDS_PATH);
    process.exit(1);
  }

  const topics = JSON.parse(fs.readFileSync(WORDS_PATH, 'utf8'));
  const uniqueTexts = new Set();

  topics.forEach((topic) => {
    topic.words.forEach((word) => {
      if (word.lv && word.lv.trim()) {
        uniqueTexts.add(word.lv.trim());
      }
    });
  });

  const texts = Array.from(uniqueTexts);
  console.log(`Found ${texts.length} unique Latvian words/phrases to process.`);

  const audioMap = {};
  let downloadedCount = 0;
  let skippedCount = 0;

  // Process with concurrency of 4
  const CONCURRENCY = 4;
  let index = 0;

  async function worker() {
    while (index < texts.length) {
      const currentIndex = index++;
      const text = texts[currentIndex];
      const key = text.toLowerCase().trim();
      const hash = getAudioHash(key);
      const filename = `lv_${hash}.mp3`;
      const filePath = path.join(AUDIO_DIR, filename);

      audioMap[key] = filename;

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
        skippedCount++;
      } else {
        try {
          await downloadAudio(text, filePath);
          downloadedCount++;
          // Small pause to be gentle
          await new Promise((r) => setTimeout(r, 60));
        } catch (err) {
          console.warn(`⚠️ Warning: could not download audio for "${text}":`, err.message);
        }
      }

      const totalDone = downloadedCount + skippedCount;
      if (totalDone % 50 === 0 || totalDone === texts.length) {
        console.log(`Progress: ${totalDone}/${texts.length} (downloaded: ${downloadedCount}, cached: ${skippedCount})`);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  // Write the map file
  fs.writeFileSync(MAP_OUTPUT_PATH, JSON.stringify(audioMap, null, 2), 'utf8');
  console.log(`✅ Saved audio map to ${MAP_OUTPUT_PATH}`);
  console.log(`🎉 Completed: ${downloadedCount} downloaded, ${skippedCount} already cached. Total: ${texts.length}.`);
}

run().catch((err) => {
  console.error('Error generating audio:', err);
  process.exit(1);
});
