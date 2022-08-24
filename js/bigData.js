(function () {
    const myChart = echarts.init(document.querySelector('.articleAnalysis'));

    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Nodejs'],
            axisLabel: {
                show: true,
                interval: 0,
                textStyle: {
                    color: '#539dfd'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#dfebfb'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#dfebfb' // 分割线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#add1ff'
                }
            },
        },
        series: [
            {
                data: [13, 28, 6, 14, 3, 7, 31],
                type: 'line',
                smooth: true
            }
        ],
        color: ['#539dfd']
    };

    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();