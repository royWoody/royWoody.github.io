 $(function () {
        //倒计时js开始
        var mydate = new Date();
        $(".month").html(mydate.getMonth() + 1)
        $(".day").html(mydate.getDate() + 2)
        //  倒计时js结束  必须保证html中除了倒计时代码外没有别的class是month或者day的元素
        //如果是1月
        if (mydate.getMonth() == 0 && mydate.getDate() == 30) {
            $(".month").html(1);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 0 && mydate.getDate() == 31) {
            $(".month").html(1);
            $(".day").html(2);
        }
        //如果是2月
        if (mydate.getMonth() == 1 && mydate.getDate() == 28) {
            $(".month").html(3);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 1 && mydate.getDate()==29) {
            $(".month").html(3);
            $(".day").html(2);
        }
        //如果是3月
        if (mydate.getMonth() == 2 && mydate.getDate() == 30) {
            $(".month").html(4);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 2 && mydate.getDate() == 31) {
            $(".month").html(4);
            $(".day").html(2);
        }
        //如果是4月
        if (mydate.getMonth() == 3 && mydate.getDate() == 29) {
            $(".month").html(5);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 3 && mydate.getDate() == 30) {
            $(".month").html(5);
            $(".day").html(2);
        }
        //如果是5月
        if (mydate.getMonth() == 4 && mydate.getDate() == 30) {
            $(".month").html(6);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 4 && mydate.getDate() == 31) {
            $(".month").html(6);
            $(".day").html(2);
        }
        //如果是6月
        if (mydate.getMonth() == 5 && mydate.getDate() == 29) {
            $(".month").html(7);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 5 && mydate.getDate() == 30) {
            $(".month").html(7);
            $(".day").html(2);
        }
        //如果是7月
        if (mydate.getMonth() == 6 && mydate.getDate() == 30) {
            $(".month").html(8);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 6 && mydate.getDate() == 31) {
            $(".month").html(8);
            $(".day").html(2);
        }
        //如果是8月
        if (mydate.getMonth() == 7 && mydate.getDate() == 30) {
            $(".month").html(9);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 7 && mydate.getDate() == 31) {
            $(".month").html(9);
            $(".day").html(2);
        }
        //如果是9月
        if (mydate.getMonth() == 8 && mydate.getDate() == 29) {
            $(".month").html(10);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 8 && mydate.getDate() == 30) {
            $(".month").html(10);
            $(".day").html(2);
        }
        //如果是10月
        if (mydate.getMonth() == 9 && mydate.getDate() == 30) {
            $(".month").html(11);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 9 && mydate.getDate() == 31) {
            $(".month").html(11);
            $(".day").html(2);
        }
        //如果是11月
        if (mydate.getMonth() == 10 && mydate.getDate() == 29) {
            $(".month").html(12);
            $(".day").html(1);
        }
        if (mydate.getMonth() == 10 && mydate.getDate() == 30) {
            $(".month").html(12);
            $(".day").html(2);
        }
        //如果是12月
        if (mydate.getMonth() ==11 && mydate.getDate() == 30) {
            $(".month").html(1);
            $(".day").html(1);
        }
        if (mydate.getMonth() ==11 && mydate.getDate() == 31) {
            $(".month").html(1);
            $(".day").html(2);
        }
    });
