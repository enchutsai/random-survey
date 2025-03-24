/*
 * 將要隨機派發的網址放入下方（不需排序）
 *
 * 並請注意：
 * 1. 網址請用引號（或稱「撇號」，單引號或雙引號皆可）包起來
 * 2. 包起來的網址之間用逗號分隔
 */


const urls = [
	'https://docs.google.com/forms/d/e/1FAIpQLSeMog-VOZ6Ca-22C-M4UobuE8_ejSFLBMwsUyEzzEERrWB_iA/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSfLsYPfjKnoMhQDl7z06-nLND_SQk7yMIaj9kPFkhNnUeYedA/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSf-35mGOzRZVWHCTzYA4PBJ6-jMAYpt4KLuw5lq_bSQcY8tRQ/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSdftdZFaWY9nV9xK_6TTlIFX-M3fPEFMp2aMXKry1J1A765Fw/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSeBuLUjOuHdV7t0qQqEr-Edt-NIQnYxRaec2qKivpdw-4dB9w/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSdXRrBYnrooOLNzglxLIwUsXvCzdI-okOrqgsx3Mjzff7oq7w/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSdtqpPLwW4tVDMK8D36cSkfp5z0iB6XhM8WKF_ArQ0oCR2v5A/viewform?usp=header',
	'https://docs.google.com/forms/d/e/1FAIpQLSdDd_Tr9pGr3ToRXEzA5O3nszkgC1dvmvADemKCTlcVKgVdYg/viewform?usp=header'
];

// 設定最低分配數量和總回應數
const minCount = 30;
const totalResponses = 2000; // 假設總共需要 2000 份問卷
let distribution = {};
let finalList = [];

// 1. 初始化，每份問卷先分配 30 份
urls.forEach(url => {
    distribution[url] = minCount;
    for (let i = 0; i < minCount; i++) {
        finalList.push(url);
    }
});

// 2. 剩餘數量，確保所有問卷均達標後才開始分配
let remaining = totalResponses - (minCount * urls.length);
let availableUrls = [...urls]; // 建立一個可分配額外數量的網址池

while (remaining > 0) {
    let randomIndex = Math.floor(Math.random() * availableUrls.length);
    let selectedUrl = availableUrls[randomIndex];

    distribution[selectedUrl]++;
    finalList.push(selectedUrl);

    remaining--;
}

// 3. 最後使用 Fisher-Yates 洗牌演算法隨機排列問卷
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(finalList);

// 4. 輸出結果
console.log("隨機分配後的 2000 份問卷清單：", finalList);
console.log("最終分配統計：", distribution);

// 5. 提供隨機問卷連結函數（用於網頁應用）
function getRandomFormLink() {
    return finalList.pop(); // 取出一個問卷，確保不會重複給到
}

// **如果在網頁應用，可用 window.location.href = getRandomFormLink();**
