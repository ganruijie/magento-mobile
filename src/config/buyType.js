/**
 *  author : liuzhuo
 *  date : 2019/8/22
 *  time : 20:27
 */
export const NORMAL = 1;
export const JOIN_GROUP = 1 << 1;
export const OPEN_GROUP = 1 << 2;

//isGroupBuy = value & GROUP; 只有 2,4,6可以得到真值
export const GROUP = JOIN_GROUP | OPEN_GROUP;
