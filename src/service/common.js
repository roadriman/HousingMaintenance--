export function  floatFormat(number) {
    var re = /^\d+(?=\.{0,1}\d+$|$)/ //验证浮点
    if (number != "") {
        if (!re.test(number))
            return 0;
        else
            return 1;
    }
}
