// 动态生成导航栏下拉箭头
(function () {
    // 获取元素并转换为数组
    const list = [...document.querySelectorAll(`.nav .one>li`)];

    list.forEach(item => {
        // 获取分类长度
        let length = item.children.length;

        // 下拉箭头
        let arrow = document.createElement('i');
        arrow.setAttribute('class', 'iconfont icon-xiajiantou')
        arrow.style.fontSize = '12px';

        // 如果为2,就证明是分类导航
        if (length === 2) {
            // 动态显示下拉箭头
            item.children[0].append(arrow)

            // 鼠标经过旋转下拉箭头
            item.onmouseover = function () {
                // 获取下拉箭头：li>a>i
                let arrow = this.children[0].children[1];
                // 给下拉箭头添加类名旋转180度
                arrow.classList.add('rotate')

                // 鼠标经过就让二级导航显示
                this.children[1].style.display = 'block';
            }

            // 鼠标离开还原下拉箭头
            item.onmouseout = function () {
                let arrow = this.children[0].children[1];
                arrow.classList.remove('rotate')

                // 鼠标离开就让二级导航隐藏
                this.children[1].style.display = 'none';
            }
        }
    })
})();

// 移动端侧边导航
(function () {
    // 点击移动端菜单按钮显示侧边导航
    (function () {
        // 左侧菜单按钮
        let menu = document.querySelector('#menu');
        // 左侧导航
        let mNav = document.querySelector('.mNav');
        // 遮罩层
        let mask = document.querySelector('.mask');

        // 点击显示移动端左侧导航
        menu.onclick = function () {
            mNav.style.left = '0px';
            mask.style.display = 'block';
        }

        // 点击任意空白处关闭左侧导航
        mask.onclick = function () {
            mNav.style.left = '-230px';
            mask.style.display = 'none';

            // 关闭侧边导航后之前点过的选项重新还原
            const nav = [...document.querySelectorAll(`.mNav ul>li`)];

            for (let i = 0; i < nav.length; i++) {
                // 获取每个导航里面的数量
                let length = nav[i].children.length;

                // 导航的数量大于等于2就证明是二级导航
                if (length >= 2) {
                    // 还原二级导航
                    nav[i].children[1].style.height = '0px';

                    // 还原下箭头
                    nav[i].children[0].children[1].setAttribute('class', 'iconfont icon-xiajiantou arrow');
                }
            }
        }
    })();

    // 动态生成移动端导航栏下拉箭头
    (function () {
        // 获取元素并转换为数组
        const list = [...document.querySelectorAll(`.mNav ul>li`)];
        // 用于存放所有二级分类
        let twoNav = [];

        list.forEach(item => {
            // 获取分类长度
            let length = item.children.length;

            // 创建一个下箭头
            let i = document.createElement('i');
            i.setAttribute('class', 'iconfont icon-xiajiantou arrow')

            // 如果为2,就证明是分类导航
            if (length === 2) {
                // 将所有二级分类添加到这个数组里
                twoNav.push(item);

                // 动态显示下箭头
                item.children[0].append(i)
                // 鼠标经过旋转下箭头
                item.addEventListener('click', function () {
                    // 获取所有下箭头
                    let arrow = document.querySelectorAll('.mNav .arrow')
                    for (let i = 0; i < twoNav.length; i++) {
                        // 把所有箭头改为下箭头
                        arrow[i].setAttribute('class', 'iconfont icon-xiajiantou arrow');

                        twoNav[i].children[0].style.color = 'var(--Yuexing-a)';
                    }

                    // 获取下箭头：li>a>i
                    let item = this.children[0].children[1];
                    // 点击哪个，就让哪个箭头变成上箭头
                    item.setAttribute('class', 'iconfont icon-xiangshangjiantou arrow')
                })
            }
        })
    })();

    // 点击显示，再次点击隐藏
    (function () {
        const nav = [...document.querySelectorAll(`.mNav ul>li`)];
        for (let i = 0; i < nav.length; i++) {
            // 获取每个导航里面的数量
            let length = nav[i].children.length;

            // 导航的数量大于等于2就证明是二级导航
            if (length >= 2) {
                // 点击哪个，就让哪个二级导航显示
                nav[i].addEventListener('click', function (e) {
                    //存储高亮颜色
                    let activeColor = ['#539dfd', '#333'];

                    let info = JSON.parse(localStorage.getItem("HighlightToggleObj"));
                    if (info) {
                        activeColor = [info.root.mNav_two_active1, info.root.mNav_two_active2]
                    }

                    if (e.target.id === 'twoNav') {
                        let height = this.children[1].style.height;

                        // 点击显示，再次点击隐藏
                        if (height === '' || height === '0px') {
                            // 获取当前元素的高度：this.children[1].scrollHeight
                            // 显示
                            this.children[0].style.color = activeColor[0];
                            this.children[1].style.height = this.children[1].scrollHeight + 'px';
                            this.children[0].children[1].setAttribute('class', 'iconfont icon-xiangshangjiantou arrow')
                        } else {
                            // 隐藏
                            this.children[0].style.color = activeColor[1];
                            this.children[1].style.height = '0px';
                            this.children[0].children[1].setAttribute('class', 'iconfont icon-xiajiantou arrow');
                        }
                    }
                })
            }
        }
    })();
})();

// 更换主题
// 鼠标来回滑动样式切换
(function () {
    const nav = document.querySelector('.nav'); //导航栏
    const logo = document.querySelector('#logo'); //logo
    const navItem = document.querySelectorAll('.nav .one>li>a'); //导航栏每一项
    const liBefore = document.querySelectorAll('.nav .one>li');
    const sousuo = document.querySelectorAll('.nav .one .function i'); //导航栏图标
    const menu = document.querySelector('.nav .one .item i') //导航栏左侧菜单按钮

    let flag = document.querySelector('.banner');
    // 鼠标上下滑动切换导航栏css样式
    window.onscroll = function () {
        // 获取页面被卷去的距离
        const top = document.documentElement.scrollTop || document.body.scrollTop;

        if (flag) {
            if (top >= 70) {
                // 修改背景颜色
                nav.style.backgroundColor = '#fff';

                // 修改logo
                logo.src = './image/logo.png';

                // 导航栏左侧菜单按钮
                menu.style.color = '#333';

                // 批量修改
                for (let i = 0; i < navItem.length; i++) {
                    // 修改文字颜色
                    navItem[i].style.color = '#333';
                    // 修改鼠标经过的下划线颜色
                    liBefore[i].classList.add('item2');

                    // 有多少就循环多少次
                    if (sousuo[i]) {
                        // 修改功能栏样式
                        sousuo[i].style.color = '#333';
                    }
                }

                // 判断有没有点击主题切换按钮
                let info = JSON.parse(localStorage.getItem("HighlightToggleObj"));
                if (info) {
                    let flag = !info.flag;
                    if (flag) {
                        // 修改背景颜色
                        nav.style.backgroundColor = '#1d1f20';
                        // 导航栏左侧菜单按钮
                        menu.style.color = '#fff';
                        // 批量修改
                        for (let i = 0; i < navItem.length; i++) {
                            // 修改文字颜色
                            navItem[i].style.color = '#fff';

                            // 有多少就循环多少次
                            if (sousuo[i]) {
                                // 修改功能栏样式
                                sousuo[i].style.color = '#fff';
                            }
                        }

                        logo.src = './image/logo2.png';
                    } else {
                        nav.style.backgroundColor = '#fff';
                    }
                }
            } else {
                nav.style.backgroundColor = 'transparent';

                logo.src = './image/logo2.png';

                menu.style.color = '#fff';

                for (let i = 0; i < navItem.length; i++) {
                    navItem[i].style.color = '#fff';
                    liBefore[i].classList.remove('item2')

                    if (sousuo[i]) {
                        sousuo[i].style.color = '#fff';
                    }
                }
            }
        }
    }

    // 拿到本地存储的信息并转换为对象形式
    let info = JSON.parse(localStorage.getItem("HighlightToggleObj"));

    // 调整细节
    if (!flag) {
        for (let i = 0; i < sousuo.length; i++) {
            if (sousuo[i]) {
                sousuo[i].style.color = '#333';
            }
        }

        menu.style.color = '#333';

        if (info) {
            if (info.flag) {
                for (let i = 0; i < sousuo.length; i++) {
                    if (sousuo[i]) {
                        sousuo[i].style.color = '#333';
                    }
                }
            } else {
                for (let i = 0; i < sousuo.length; i++) {
                    if (sousuo[i]) {
                        sousuo[i].style.color = '#fff';
                    }
                }

                menu.style.color = '#fff';
            }
        }
    }

    // 白天昼夜切换
    (function () {
        // 获取css全局变量
        let root = document.querySelector(':root');
        const HighlightToggle = document.querySelector('#HighlightToggle');
        // 白天黑夜图标
        const img = document.querySelector('#HighlightToggle img');

        // 作者信息背景图
        let author_bg = document.querySelector('.author-bg');


        //true代表黑夜，false白天
        let flag = true;
        if (info) {
            // 样式更改
            HighlightToggle.style.backgroundColor = info.backgroundColor;
            img.style.left = info.left;
            img.src = info.src;
            flag = info.flag;

            if (author_bg) {
                // 修改作者信息背景图
                author_bg.style.backgroundImage = info.author_bg;
            }

            // 主题样式更改
            root.style.setProperty('--Yuexing-color', info.root.color);
            root.style.setProperty('--Yuexing-body-bg', info.root.body_bg);
            root.style.setProperty('--Yuexing-bg', info.root.bg);
            root.style.setProperty('--Yuexing-a', info.root.a);
            root.style.setProperty('--Yuexing-a-vice', info.root.a_vice);
            root.style.setProperty('--Yuexing-hr', info.root.hr);
            root.style.setProperty('--Yuexing-footer', info.root.footer);
            root.style.setProperty('--Yuexing-ripple', info.root.ripple);
            root.style.setProperty('--Yuexing-tags-a', info.root.tags_a);
            root.style.setProperty('--Yuexing-nav-tags', info.root.nav_tags);
            root.style.setProperty('--Yuexing-banner-linear', info.root.banner_linear);
            root.style.setProperty('--Yuexing-pagination-a', info.root.pagination_a);
            root.style.setProperty('--Yuexing-select', info.root.select);
            root.style.setProperty('--Yuexing-article', info.root.article);
            root.style.setProperty('--Yuexing-input-bk', info.root.input_bk);
            root.style.setProperty('--Yuexing-input-bj', info.root.input_bj);
            root.style.setProperty('--Yuexing-tags-bk', info.root.tags_bk);
            root.style.setProperty('--Yuexing-text-bk', info.root.text_bk);
            root.style.setProperty('--Yuexing-dashed', info.root.dashed);
            root.style.setProperty('--Yuexing-mNav', info.root.mNav);
            root.style.setProperty('--Yuexing-mNav-two', info.root.mNav_two);
            root.style.setProperty('--Yuexing-mNav-two-active1', info.root.mNav_two_active1);
            root.style.setProperty('--Yuexing-mNav-two-active2', info.root.mNav_two_active2);
            root.style.setProperty('--Yuexing-links-item-bg', info.root.links_item_bg);
            root.style.setProperty('--Yuexing-title', info.root.title);
            root.style.setProperty('--Yuexing-tool', info.root.tool);
            root.style.setProperty('--Yuexing-commentTextarea', info.root.commentTextarea);
            root.style.setProperty('--Yuexing-commentList', info.root.commentList);

            // 调整细节
            let banner = !document.querySelector('.banner');
            if (banner) {
                if (info.flag) {
                    logo.src = './image/logo.png';
                } else {
                    logo.src = './image/logo2.png';
                }
            }
        }

        let obj = {}; //存储css样式

        // 点击切换白天 / 黑夜
        HighlightToggle.onclick = function () {
            // 月亮
            if (flag) {
                // 更改样式
                obj = {
                    backgroundColor: '#464646',
                    left: '20px',
                    src: './image/yueliang.png',
                    flag: false,
                    root: {
                        color: '#539dfd',
                        body_bg: '#151617',
                        bg: '#1d1f20',
                        a: '#fff',
                        a_vice: '#a4a8b4',
                        hr: '#000',
                        footer: '#1d1f20',
                        ripple: 'rgba(21, 22, 23, 0.7)',
                        tags_a: '#fff',
                        nav_tags: '#fff',
                        banner_linear: '21, 22, 23',
                        pagination_a: '#151617',
                        article: '#a4a8b4',
                        select: 'transparent',
                        input_bk: '#151617',
                        input_bj: '#151617',
                        tags_bk: '#a4a8b4',
                        text_bk: '#333',
                        dashed: '#333',
                        mNav: '#151617',
                        mNav_two: '#1d1f20',
                        mNav_two_active1: '#539dfd',
                        mNav_two_active2: '#fff',
                        links_item_bg: '#313131',
                        title: '#539dfd',
                        tool: '#333',
                        commentTextarea:'#292929',
                        commentList:'#343637'
                    },
                    author_bg: 'url(http://139.196.43.147/gallery/t015a66384456670422.jpg)'
                }

                // 持久化到本地存储
                localStorage.setItem("HighlightToggleObj", JSON.stringify(obj))

                const top = document.documentElement.scrollTop;

                let flag = document.querySelector('.banner');
                // 有轮播图的页面样式 
                if (flag) {
                    if (top >= 100) {
                        // 修改背景颜色
                        nav.style.backgroundColor = '#1d1f20';
                        menu.style.color = '#fff';
                    } else {
                        nav.style.backgroundColor = 'transparent';
                        menu.style.color = '#fff';
                    }

                    // 批量修改
                    for (let i = 0; i < navItem.length; i++) {
                        // 修改文字颜色
                        navItem[i].style.color = '#fff';

                        // 有多少就循环多少次
                        if (sousuo[i]) {
                            // 修改功能栏样式
                            sousuo[i].style.color = '#fff';
                        }
                    }

                    logo.src = './image/logo2.png';
                }
                // 没有轮播图的页面样式 
                else {
                    nav.style.backgroundColor = '#1d1f20';
                    logo.src = './image/logo2.png';
                    menu.style.color = '#fff';

                    // 批量修改
                    for (let i = 0; i < navItem.length; i++) {
                        // 修改文字颜色
                        navItem[i].style.color = '#fff';

                        if (sousuo[i]) {
                            sousuo[i].style.color = '#fff';
                        }
                    }
                }

                let mNav = document.querySelectorAll('.mNav ul li a');
                for (let i = 0; i < mNav.length; i++) {
                    mNav[i].style.color = '#fff';
                }
            }
            // 太阳
            else {
                obj = {
                    backgroundColor: '#eee',
                    left: '0px',
                    src: './image/taiyang.png',
                    flag: true,
                    root: {
                        color: '#539dfd',
                        body_bg: '#f9f9f9',
                        bg: '#fff',
                        a: '#333',
                        a_vice: '#5a5a5a',
                        hr: '#ededed',
                        footer: '#fff',
                        ripple: 'rgba(249, 249, 249, 0.7)',
                        tags_a: '#539dfd',
                        nav_tags: '#666',
                        banner_linear: '249, 249, 249',
                        pagination_a: '#ebf1ff',
                        article: '#333',
                        select: '#f2f3fc',
                        input_bk: '#dedede',
                        input_bj: '#fff',
                        tags_bk: '#f3f4f9',
                        text_bk: '#ddd',
                        dashed: '#eee',
                        mNav: '#fff',
                        mNav_two: '#f9f9f9',
                        mNav_two_active1: '#539dfd',
                        mNav_two_active2: '#333',
                        links_item_bg: '#fff',
                        title: '#333',
                        tool: '#f4f9ff',
                        commentTextarea:'#f2f7ff',
                        commentList:'#fbfcfc'
                    },
                    author_bg: 'url(http://139.196.43.147/gallery/2022-07-19-22-35.jpg)'
                }

                localStorage.setItem("HighlightToggleObj", JSON.stringify(obj))

                const top = document.documentElement.scrollTop;

                let flag = document.querySelector('.banner');
                // 有轮播图的页面样式
                if (flag) {
                    if (top >= 100) {
                        // 修改背景颜色
                        nav.style.backgroundColor = '#fff';
                        menu.style.color = '#333';

                        for (let i = 0; i < navItem.length; i++) {
                            navItem[i].style.color = '#333';

                            if (sousuo[i]) {
                                sousuo[i].style.color = '#333';
                            }
                        }

                        logo.src = './image/logo.png';
                    } else {
                        nav.style.backgroundColor = 'transparent';
                        menu.style.color = '#fff';

                        for (let i = 0; i < navItem.length; i++) {
                            navItem[i].style.color = '#fff';

                            if (sousuo[i]) {
                                sousuo[i].style.color = '#fff';
                            }
                        }

                        logo.src = './image/logo2.png';
                    }
                }
                // 没有轮播图的页面样式 
                else {
                    nav.style.backgroundColor = '#fff';
                    logo.src = './image/logo.png';
                    menu.style.color = '#333';

                    // 批量修改
                    for (let i = 0; i < navItem.length; i++) {
                        // 修改文字颜色
                        navItem[i].style.color = '#333';

                        if (sousuo[i]) {
                            sousuo[i].style.color = '#333';
                        }
                    }
                }

                let mNav = document.querySelectorAll('.mNav ul li a');
                for (let i = 0; i < mNav.length; i++) {
                    mNav[i].style.color = '#333';
                }
            }

            // 从本地存储中拿到数据
            let info = JSON.parse(localStorage.getItem("HighlightToggleObj"));

            // 更改样式
            HighlightToggle.style.backgroundColor = info.backgroundColor;
            img.style.left = info.left;
            img.src = info.src;
            flag = info.flag;

            if (author_bg) {
                // 修改作者信息背景图
                author_bg.style.backgroundImage = info.author_bg;
            }

            // 更换主题
            root.style.setProperty('--Yuexing-color', info.root.color);
            root.style.setProperty('--Yuexing-body-bg', info.root.body_bg);
            root.style.setProperty('--Yuexing-bg', info.root.bg);
            root.style.setProperty('--Yuexing-a', info.root.a);
            root.style.setProperty('--Yuexing-a-vice', info.root.a_vice);
            root.style.setProperty('--Yuexing-hr', info.root.hr);
            root.style.setProperty('--Yuexing-footer', info.root.footer);
            root.style.setProperty('--Yuexing-ripple', info.root.ripple);
            root.style.setProperty('--Yuexing-tags-a', info.root.tags_a);
            root.style.setProperty('--Yuexing-nav-tags', info.root.nav_tags);
            root.style.setProperty('--Yuexing-banner-linear', info.root.banner_linear);
            root.style.setProperty('--Yuexing-pagination-a', info.root.pagination_a);
            root.style.setProperty('--Yuexing-select', info.root.select);
            root.style.setProperty('--Yuexing-article', info.root.article);
            root.style.setProperty('--Yuexing-input-bk', info.root.input_bk);
            root.style.setProperty('--Yuexing-input-bj', info.root.input_bj);
            root.style.setProperty('--Yuexing-tags-bk', info.root.tags_bk);
            root.style.setProperty('--Yuexing-text-bk', info.root.text_bk);
            root.style.setProperty('--Yuexing-dashed', info.root.dashed);
            root.style.setProperty('--Yuexing-mNav', info.root.mNav);
            root.style.setProperty('--Yuexing-mNav-two', info.root.mNav_two);
            root.style.setProperty('--Yuexing-mNav-two-active1', info.root.mNav_two_active1);
            root.style.setProperty('--Yuexing-mNav-two-active2', info.root.mNav_two_active2);
            root.style.setProperty('--Yuexing-links-item-bg', info.root.links_item_bg);
            root.style.setProperty('--Yuexing-title', info.root.title);
            root.style.setProperty('--Yuexing-tool', info.root.tool);
            root.style.setProperty('--Yuexing-commentTextarea', info.root.commentTextarea);
            root.style.setProperty('--Yuexing-commentList', info.root.commentList);
        }
    })()
})();

// 侧边工具栏
(function () {
    const returnTop = document.querySelector('#returnTop');

    // 点击返回顶部
    returnTop.onclick = function () {
        // 获取当前的距离
        let top = window.pageYOffset;

        let time = setInterval(function () {
            top -= 10;
            window.scroll(0, top);

            // 当前位置小于0时就当前位置等于0
            if (top < 0) {
                fn()
            }
        })

        // 调用
        function fn() {
            window.scroll(0, 0);
            clearInterval(time)
        }
    }
})();