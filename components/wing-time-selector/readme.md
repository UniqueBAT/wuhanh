### TimeSelector 多粒度时间选择器

**简介：**
本组件是一种可多种样式显示时间选择器，可根据你所要指定的区间及时间进行灵活性的选择，组件名：``wing-time-selector``，代码块： timeSelector。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
export default {
    components: {timeSelector}
}
```

在 ``template`` 中使用组件

```html
<timePicker
	showType="date"
	beginDate="1970-01-01"
	endDate="2030-12-31"
	beginTime="06:00:00"
	endTime="23:59:59"
	@btnConfirm="btnConfirm" 
	@btnCancel="btnCancel"
>
	<text>时间选择器</text>
</timePicker>
```

实际效果参考：[https://github.com/749402932/uni-app-compontents/tree/master/uni-wing-time-selector-demo](https://github.com/749402932/uni-app-compontents/tree/master/uni-wing-time-selector-demo)

**TimePicker 属性说明：**

|属性名		|类型	|默认值	                    |说明								|
|---		|----	|---	                    |---								|
|showType	|String	|'dateToTime'				|时间选择器的显示模式，默认可以不填		|
|beginDate	|String	|'1900-01-01'				|限制选择器开始日期，默认可以不填		|
|endDate	|String	|'2500-12-31'				|限制选择器结束日期，默认可以不填		|
|beginTime	|String	|'00:00:00'	                |限制选择器时间段开始时间，默认可以不填	|
|endTime	|String	|'23:59:59'		            |限制选择器时间段结束时间，默认可以不填	|
|isClick	|Boolean|false						|是否为禁用点击状态，默认可以不填		|


**showType 值说明：**

|值 				|类型	|说明					|
|---				|----	|---					|
|year				|String	|选择器显示年				|
|month				|String	|选择器显示月份			|
|day				|String	|选择器显示天				|
|hour				|String	|选择器显示小时			|
|minute	    		|String |选择器显示分钟			|
|second	    		|String |选择器显示秒				|
|yearToMonth		|String |选择器显示年月			|
|monthToDay			|String |选择器显示月日			|
|hourToMinute		|String |选择器显示时分			|
|minuteToSecond		|String |选择器显示分秒			|
|date				|String |选择器显示年月日			|
|time				|String |选择器显示时分秒			|
|yearToMinutes		|String |选择器显示年月日时分		|
|dateToTime			|String |选择器显示年月日时分秒	|

**事件说明：**

|事件名称	|说明		|
|---|---|
|btnConfirm	|时间选择器点击【确定】按钮时时触发的事件，参数为e|
|btnCancel	|时间选择器点击【取消】按钮时时触发的事件|

v_1.0.0
**修复BUG说明：**
暂无

**感谢：**

> 在这里如您有更多优化建议和需求，请联系作者。谢谢！