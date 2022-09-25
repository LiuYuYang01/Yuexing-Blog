let strs = [
  {
    title: "前途未必光明坦荡，但一定充满渴望!",
    stop: 5,
  },
  {
    title: "没有梦想，和咸鱼有什么区别?",
    stop: 10,
  },
  {
    title: "没有什么能够顾阻你,前进的步伐!",
    stop: 15,
    // stop: [4, 13]
  }
];
// 当前进行到第几行
let currentIndex = 0;
let h1 = null;
let spans = null;

setTimeout(() => {
  h1 = document.createElement("h1");
  h1.classList.add('typing')
  // 添加到哪
  // document.body.appendChild(h1);

  let banner = document.querySelector('.banner .cate_info');
  banner.appendChild(h1);

  init();
}, 500);

function init() {
  if (currentIndex == strs.length) {
    currentIndex = 0;
  }
  h1.innerHTML = strs[currentIndex].title;
  h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>");

  let delay = 0;
  spans = [...document.querySelectorAll(".banner .cate_info span")];
  spans.forEach((span, i) => {
    delay += 0.1;
    if (strs[currentIndex].stop instanceof Array) {
      if (strs[currentIndex].stop.includes(i)) {
        delay += 0.3;
      }
    } else {
      if (strs[currentIndex].stop == i) {
        delay += 0.3;
      }
    }

    span.style.setProperty("--delay", `${delay}s`);
  });

  h1.addEventListener("animationend", lastEnd);
}

function lastEnd(e) {
  if (e.target == document.querySelector("h1 span:last-child")) {
    h1.classList.add("ended");
    setTimeout(() => {
      h1.removeEventListener("animationend", lastEnd);
      let delay = 0;

      spans.reverse().forEach((span, i) => {
        h1.classList.remove("ended");
        span.style.width = "2ch";
        span.style.animation = "0.1s text-out ease-in-out forwards";
        delay += 0.05;
        // 回去停顿功能
        if (strs[currentIndex].stop instanceof Array) {
          if (strs[currentIndex].stop.includes(spans.length - i)) {
            delay += 0.3
          }
        } else {
          if (strs[currentIndex].stop == spans.length - i) {
            delay += 0.3
          }
        }
        span.style.animationDelay = `${delay}s`;
      });
      h1.addEventListener("animationend", firstEnd);
    }, 2000);
  }
}

function firstEnd(e) {
  if (e.target == document.querySelector("h1 span:first-child")) {
    spans.forEach((item) => {
      item.remove();
    });
    h1.removeEventListener("animationend", firstEnd);
    currentIndex++;
    // h1.classList.add('ended')
    // h1.classList.remove('ended')
    init();
  }
}