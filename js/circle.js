/*
	author: '刘宇阳',
	Gitee: 'https://gitee.com/liu_yu_yang666/yuexing',
	describe: '等风来不如追风去，仰望光不如成为光！'
*/

// 朋友圈图片布局
(function () {
    const listImg = document.querySelectorAll('.listImg');

    for (let i = 0; i < listImg.length; i++) {
        let length = listImg[i].children.length;

        // 如果一张图就显示 100%
        if (length === 1) {
            listImg[i].children[0].style.width = '100%'
        }
        // 如果两张图以上就显示 49%
        else if (length >= 2) {
            for (let j = 0; j < length; j++) {
                listImg[i].children[j].style.width = '49%'
            }
        }
    }
})();

// 朋友圈评论按钮
(function () {
    // 评论按钮
    const circleComment = document.querySelectorAll('#circleComment');
    // 评论框
    const commentBox = document.querySelectorAll('.commentBox');

    // 给所有朋友圈的评论框添加点击事件
    for (let i = 0; i < circleComment.length; i++) {
        circleComment[i].onclick = function () {
            // 如果隐藏就让他点击显示，反之点击隐藏评论框
            commentBox[i].style.display === '' || commentBox[i].style.display === 'none' ? commentBox[i].style.display = 'block' : commentBox[i].style.display = 'none';
        }
    }
})();