<template>
	<view>
		<picker mode="multiSelector" :range="dates" :value="value" @change="confirm" @columnchange="scroll" @cancel="cancel" :disabled="disabled">
				<slot></slot>
		</picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dates: [],
			years: [],
			year: 2020,
			beginYear: 1900,
			endYear: 2050,
			months: [],
			month: 1,
			beginMonth: 1,
			endMonth: 12,
			days: [],
			day: 1,
			beginDay: 1,
			endDay: 31,
			hours: [],
			hour: 0,
			beginHour: 0,
			endHour: 23,
			minutes: [],
			minute: 0,
			beginMinute: 0,
			endMinute: 59,
			seconds: [],
			second: 0,
			beginSecond: 0,
			endSecond: 59,
			value: [],
			showMode: this.showType,
			disabled: this.isClick
		};
	},
	props: {
		showType: {
			type: String,
			default: 'dateToTime'
		},
		beginDate: {
			type: String,
			default: '1900-01-01'
		},
		beginTime: {
			type: String,
			default: '00:00:00'
		},
		endDate: {
			type: String,
			default: '2050-12-31'
		},
		endTime: {
			type: String,
			default: '23:59:59'
		},
		isClick: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		showType(oldValue, newValue) {
			console.log('showType传入数值变化：', oldValue + '->' + newValue);
			this.showMode = newValue;
		},
		isClick(oldValue, newValue) {
			console.log('isClick传入数值变化：', oldValue + '->' + newValue);
			this.disabled = newValue;
		}
	},
	created() {
		if (this.getMillisecond(this.beginDate) > this.getMillisecond(this.endDate)) {
			let date = this.beginDate;
			this.beginDate = this.endDate;
			this.endDate = date;
		}
		if (this.getMillisecond('2020-01-01 ' + this.beginTime) > this.getMillisecond('2020-01-01 ' + this.endTime)) {
			let time = this.beginTime;
			this.beginTime = this.endTime;
			this.endTime = time;
		}
		// 日期
		let beginDateList = this.beginDate.split('-');
		this.beginYear = beginDateList[0];
		this.beginMonth = beginDateList[1].charAt(0) == '0' ? beginDateList[1].charAt(1) : beginDateList[1];
		this.beginDay = beginDateList[2].charAt(0) == '0' ? beginDateList[2].charAt(1) : beginDateList[2];
		let endDateList = this.endDate.split('-');
		this.endYear = endDateList[0];
		this.endMonth = endDateList[1].charAt(0) == '0' ? endDateList[1].charAt(1) : endDateList[1];
		this.endDay = endDateList[2].charAt(0) == '0' ? endDateList[2].charAt(1) : endDateList[2];
		// 时间
		let beginTimeList = this.beginTime.split(':');
		this.beginHour = beginTimeList[0].charAt(0) == '0' ? beginTimeList[0].charAt(1) : beginTimeList[0];
		this.beginMinute = beginTimeList[1].charAt(0) == '0' ? beginTimeList[1].charAt(1) : beginTimeList[1];
		this.beginSecond = beginTimeList[2].charAt(0) == '0' ? beginTimeList[2].charAt(1) : beginTimeList[2];
		let endTimeList = this.endTime.split(':');
		this.endHour = endTimeList[0].charAt(0) == '0' ? endTimeList[0].charAt(1) : endTimeList[0];
		this.endMinute = endTimeList[1].charAt(0) == '0' ? endTimeList[1].charAt(1) : endTimeList[1];
		this.endSecond = endTimeList[2].charAt(0) == '0' ? endTimeList[2].charAt(1) : endTimeList[2];
		this.getDate();
		for (var i = this.beginYear; i <= this.endYear; i++) {
			this.years.push(i + '年');
		}
		this.getMonths();
		this.getDays();
		for (var i = this.beginHour; i <= this.endHour; i++) {
			this.hours.push(i + '时');
		}
		for (var i = this.beginMinute; i <= this.endMinute; i++) {
			this.minutes.push(i + '分');
		}
		for (var i = this.beginSecond; i <= this.endSecond; i++) {
			this.seconds.push(i + '秒');
		}
		this.getData();
	},
	methods: {
		scroll(e) {
			console.log('每一列滑动监听:', e);
			let column = e.detail.column;
			let value = e.detail.value;
			switch (this.showMode) {
				case 'monthToDay':
					{
						this.getMonths();
						if (column == 0) {
							this.month = this.months[value].substring(0, this.months[value].length - 1);
							this.getDays();
						}

						this.dates[0] = this.months;
						this.dates[1] = this.days;
					}
					break;
				case 'yearToMonth':
					{
						if (column == 0) {
							this.year = this.years[value].substring(0, 4);
							if (value == 0) {
								this.month = this.beginMonth;
							}
						}
						this.getMonths();
						if (column == 1) {
							this.month = this.months[value].substring(0, this.months[value].length - 1);
						}
						this.dates[1] = this.months;
					}
					break;
				case 'date':
				case 'yearToMinute':
				case 'dateToTime': {
					if (column == 0) {
						this.year = this.years[value].substring(0, 4);
						if (value == 0) {
							this.month = this.beginMonth;
						}
						if (value == this.years.length - 1) {
							this.month = this.endMonth;
						}
					}
					this.getMonths();
					if (column == 1) {
						this.month = this.months[value].substring(0, this.months[value].length - 1);
					}
					this.getDays();
					this.dates[1] = this.months;
					this.dates[2] = this.days;
				}
			}
		},
		confirm(e) {
			console.log('确定:', e);
			
			let value=e.detail.value
			let date=''
			switch (this.showMode) {
				case 'year':
					{
						date={
							key:this.years[value[0]].substring(0,4),
							value:this.years[value[0]]
						}
					}
					break;
				case 'month':
					{
						date={
							key:this.months[value[0]].substring(0,this.months[value[0]].length-1),
							value:this.months[value[0]]
						}
					}
					break;
				case 'day':
					{
						date={
							key:this.days[value[0]].substring(0,this.days[value[0]].length-1),
							value:this.days[value[0]]
						}
					}
					break;
				case 'hour':
					{
						date={
							key:this.hours[value[0]].substring(0,this.hours[value[0]].length-1),
							value:this.hours[value[0]]
						}
					}
					break;
				case 'minute':
					{
						date={
							key:this.minutes[value[0]].substring(0,this.minutes[value[0]].length-1),
							value:this.minutes[value[0]]
						}
					}
					break;
				case 'second':
					{
						date={
							key:this.seconds[value[0]].substring(0,this.seconds[value[0]].length-1),
							value:this.seconds[value[0]]
						}
					}
					break;
				case 'yearToMonth':
					{
						let month=this.months[value[1]].substring(0,this.months[value[1]].length-1)
						date={
							year:this.years[value[0]].substring(0,4),
							month,
							key:this.years[value[0]].substring(0,4)+'-'+(month.length==1?'0'+month:month),
							value:this.years[value[0]]+this.months[value[1]]
						}
					}
					break;
				case 'monthToDay':
					{
						let month=this.months[value[0]].substring(0,this.months[value[0]].length-1)
						let day=this.days[value[1]].substring(0,this.days[value[1]].length-1)
						date={
							month,
							day,
							key:(month.length==1?'0'+month:month)+'-'+(day.length==1?'0'+day:day),
							value:this.months[value[0]]+this.days[value[1]]
						}
					}
					break;
				case 'hourToMinute':
					{
						let hour=this.hours[value[0]].substring(0,this.hours[value[0]].length-1)
						let minute=this.minutes[value[1]].substring(0,this.minutes[value[1]].length-1)
						date={
							hour,
							minute,
							key:(hour.length==1?'0'+hour:hour)+':'+(minute.length==1?'0'+minute:minute),
							value:this.hours[value[0]]+this.minutes[value[1]]
						}
					}
					break;
				case 'minuteToSecond':
					{
						let minute=this.minutes[value[0]].substring(0,this.minutes[value[0]].length-1)
						let second=this.seconds[value[1]].substring(0,this.seconds[value[1]].length-1)
						date={
							key:(minute.length==1?'0'+minute:minute)+':'+(second.length==1?'0'+second:second),
							value:this.minutes[value[0]]+this.seconds[value[1]]
						}
					}
					break;
				case 'date':
					{
						let month=this.months[value[1]].substring(0,this.months[value[1]].length-1)
						let day=this.days[value[2]].substring(0,this.days[value[2]].length-1)
						date={
							year:this.years[value[0]].substring(0,4),
							month,
							day,
							key:this.years[value[0]].substring(0,4)+'-'+(month.length==1?'0'+month:month)+'-'+(day.length==1?'0'+day:day),
							value:this.years[value[0]]+this.months[value[1]]+this.days[value[2]]
						}
					}
					break;
				case 'time':
					{
						let hour=this.hours[value[0]].substring(0,this.hours[value[0]].length-1)
						let minute=this.minutes[value[1]].substring(0,this.minutes[value[1]].length-1)
						let second=this.seconds[value[2]].substring(0,this.seconds[value[2]].length-1)
						date={
							hour,
							minute,
							second,
							key:(hour.length==1?'0'+hour:hour)+':'+(minute.length==1?'0'+minute:minute)+':'+(second.length==1?'0'+second:second),
							value:this.hours[value[0]]+this.minutes[value[1]]+this.seconds[value[2]]
						}
					}
					break;
				case 'yearToMinute':
					{
						let month=this.months[value[1]].substring(0,this.months[value[1]].length-1)
						let day=this.days[value[2]].substring(0,this.days[value[2]].length-1)
						let hour=this.hours[value[3]].substring(0,this.hours[value[3]].length-1)
						let minute=this.minutes[value[4]].substring(0,this.minutes[value[4]].length-1)
						date={
							year:this.years[value[0]].substring(0,4),
							month,
							day,
							hour,
							minute,
							key:this.years[value[0]].substring(0,4)+'-'+(month.length==1?'0'+month:month)+'-'+(day.length==1?'0'+day:day)+' '+(hour.length==1?'0'+hour:hour)+':'+(minute.length==1?'0'+minute:minute),
							value:this.years[value[0]]+this.months[value[1]]+this.days[value[2]]+this.hours[value[3]]+this.minutes[value[4]]
						}
					}
					break;
				default:
					{
						let month=this.months[value[1]].substring(0,this.months[value[1]].length-1)
						let day=this.days[value[2]].substring(0,this.days[value[2]].length-1)
						let hour=this.hours[value[3]].substring(0,this.hours[value[3]].length-1)
						let minute=this.minutes[value[4]].substring(0,this.minutes[value[4]].length-1)
						let second=this.seconds[value[5]].substring(0,this.seconds[value[5]].length-1)
						date={
							year:this.years[value[0]].substring(0,4),
							month,
							day,
							hour,
							minute,
							second,
							key:this.years[value[0]].substring(0,4)+'-'+(month.length==1?'0'+month:month)+'-'+(day.length==1?'0'+day:day)+' '+(hour.length==1?'0'+hour:hour)+':'+(minute.length==1?'0'+minute:minute)+':'+(second.length==1?'0'+second:second),
							value:this.years[value[0]]+this.months[value[1]]+this.days[value[2]]+this.hours[value[3]]+this.minutes[value[4]]+this.seconds[value[5]]
						}
					}
					break;
			}
			this.$emit('btnConfirm',date)
		},
		cancel(e) {
			// console.log('取消:', e);
			this.$emit('btnCancel');
		},
		getMonths() {
			this.months = [];
			if (this.beginYear == this.year && this.endYear == this.year) {
				for (var i = this.beginMonth; i <= this.endMonth; i++) {
					this.months.push(i + '月');
				}
			} else if (this.beginYear >= this.year) {
				for (var i = this.beginMonth; i <= 12; i++) {
					this.months.push(i + '月');
				}
			} else if (this.endYear <= this.year) {
				for (var i = 1; i <= this.endMonth; i++) {
					this.months.push(i + '月');
				}
			} else {
				for (var i = 1; i <= 12; i++) {
					this.months.push(i + '月');
				}
			}
		},
		getDays() {
			this.days = [];
			switch (this.month) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
				case '1':
				case '3':
				case '5':
				case '7':
				case '8':
				case '10':
				case '12':
					{
						if (this.beginDay < 0 || this.beginDay > 31) {
							this.beginDay = 1;
						}
						if (this.endDay < 0 || this.endDay > 31) {
							this.endDay = 31;
						}
						if (this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month && this.endMonth == this.month) {
							for (var i = this.beginDay; i <= this.endDay; i++) {
								this.days.push(i + '日');
							}
						} else if (
							(this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month) ||
							(this.beginYear >= this.year && this.beginMonth == this.month)
						) {
							for (var i = this.beginDay; i <= 31; i++) {
								this.days.push(i + '日');
							}
						} else if (
							(this.beginYear == this.year && this.endYear == this.year && this.endMonth == this.month) ||
							(this.endYear <= this.year && this.endMonth == this.month)
						) {
							for (var i = 1; i <= this.endDay; i++) {
								this.days.push(i + '日');
							}
						} else {
							for (var i = 1; i <= 31; i++) {
								this.days.push(i + '日');
							}
						}
					}
					break;
				case 4:
				case 6:
				case 9:
				case 11:
				case '4':
				case '6':
				case '9':
				case '11':
					{
						if (this.beginDay < 0 || this.beginDay > 30) {
							this.beginDay = 1;
						}
						if (this.endDay < 0 || this.endDay > 30) {
							this.endDay = 30;
						}
						if (this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month && this.endMonth == this.month) {
							for (var i = this.beginDay; i <= this.endDay; i++) {
								this.days.push(i + '日');
							}
						} else if (
							(this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month) ||
							(this.beginYear >= this.year && this.beginMonth == this.month)
						) {
							for (var i = this.beginDay; i <= 30; i++) {
								this.days.push(i + '日');
							}
						} else if (
							(this.beginYear == this.year && this.endYear == this.year && this.endMonth == this.month) ||
							(this.endYear <= this.year && this.endMonth == this.month)
						) {
							for (var i = 1; i <= this.endDay; i++) {
								this.days.push(i + '日');
							}
						} else {
							for (var i = 1; i <= 30; i++) {
								this.days.push(i + '日');
							}
						}
					}
					break;
				case 2:
				case '2':
					{
						if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
							if (this.beginDay < 0 || this.beginDay > 29) {
								this.beginDay = 1;
							}
							if (this.endDay < 0 || this.endDay > 29) {
								this.endDay = 29;
							}
							if (this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month && this.endMonth == this.month) {
								for (var i = this.beginDay; i <= this.endDay; i++) {
									this.days.push(i + '日');
								}
							} else if (
								(this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month) ||
								(this.beginYear >= this.year && this.beginMonth == this.month)
							) {
								for (var i = this.beginDay; i <= 29; i++) {
									this.days.push(i + '日');
								}
							} else if (
								(this.beginYear == this.year && this.endYear == this.year && this.endMonth == this.month) ||
								(this.endYear <= this.year && this.endMonth == this.month)
							) {
								for (var i = 1; i <= this.endDay; i++) {
									this.days.push(i + '日');
								}
							} else {
								for (var i = 1; i <= 29; i++) {
									this.days.push(i + '日');
								}
							}
						} else {
							if (this.beginDay < 0 || this.beginDay > 28) {
								this.beginDay = 1;
							}
							if (this.endDay < 0 || this.endDay > 28) {
								this.endDay = 28;
							}
							if (this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month && this.endMonth == this.month) {
								for (var i = this.beginDay; i <= this.endDay; i++) {
									this.days.push(i + '日');
								}
							} else if (
								(this.beginYear == this.year && this.endYear == this.year && this.beginMonth == this.month) ||
								(this.beginYear >= this.year && this.beginMonth == this.month)
							) {
								for (var i = this.beginDay; i <= 28; i++) {
									this.days.push(i + '日');
								}
							} else if (
								(this.beginYear == this.year && this.endYear == this.year && this.endMonth == this.month) ||
								(this.endYear <= this.year && this.endMonth == this.month)
							) {
								for (var i = 1; i <= this.endDay; i++) {
									this.days.push(i + '日');
								}
							} else {
								for (var i = 1; i <= 28; i++) {
									this.days.push(i + '日');
								}
							}
						}
					}
					break;
			}
		},
		getDate() {
			var date = new Date();
			this.year = date.getFullYear();
			if (this.beginYear > this.year) {
				this.year = this.beginYear;
				this.month = this.beginMonth;
				this.day = this.beginDay;
			} else if (this.endYear < this.year) {
				this.year = this.endYear;
				this.month = this.endMonth;
				this.day = this.endDay;
			} else {
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
			}

			this.hour = date.getHours();
			this.minute = date.getMinutes();
			this.second = date.getSeconds();
		},
		getData() {
			this.dates = [];
			let yearIndex = 0;
			let monthIndex = 0;
			let dayIndex = 0;
			let hourIndex = 0;
			let minuteIndex = 0;
			let secondIndex = 0;
			switch (this.showMode) {
				case 'year':
					{
						this.dates.push(this.years);
						this.years.map((item, index) => {
							if (this.year == item.substring(0, 4)) {
								yearIndex = index;
							}
						});
						this.value = [yearIndex];
					}
					break;
				case 'month':
					{
						this.dates.push(this.months);
						this.months.map((item, index) => {
							if (this.month == item.substring(0, item.length - 1)) {
								monthIndex = index;
							}
						});
						this.value = [monthIndex];
					}
					break;
				case 'day':
					{
						this.dates.push(this.days);
						this.days.map((item, index) => {
							if (this.day == item.substring(0, item.length - 1)) {
								dayIndex = index;
							}
						});
						this.value = [dayIndex];
					}
					break;
				case 'hour':
					{
						this.dates.push(this.hours);
						this.hours.map((item, index) => {
							if (this.hour == item.substring(0, item.length - 1)) {
								hourIndex = index;
							}
						});
						this.value = [hourIndex];
					}
					break;
				case 'minute':
					{
						this.dates.push(this.minutes);
						this.minutes.map((item, index) => {
							if (this.minute == item.substring(0, item.length - 1)) {
								minuteIndex = index;
							}
						});
						this.value = [minuteIndex];
					}
					break;
				case 'second':
					{
						this.dates.push(this.seconds);
						this.seconds.map((item, index) => {
							if (this.second == item.substring(0, item.length - 1)) {
								secondIndex = index;
							}
						});
						this.value = [secondIndex];
					}
					break;
				case 'yearToMonth':
					{
						this.dates.push(this.years);
						this.dates.push(this.months);
						this.years.map((item, index) => {
							if (this.year == item.substring(0, 4)) {
								yearIndex = index;
							}
						});
						this.months.map((item, index) => {
							if (this.month == item.substring(0, item.length - 1)) {
								monthIndex = index;
							}
						});
						this.value = [yearIndex, monthIndex];
					}
					break;
				case 'monthToDay':
					{
						this.dates.push(this.months);
						this.dates.push(this.days);
						this.months.map((item, index) => {
							if (this.month == item.substring(0, item.length - 1)) {
								monthIndex = index;
							}
						});
						this.days.map((item, index) => {
							if (this.day == item.substring(0, item.length - 1)) {
								dayIndex = index;
							}
						});
						this.value = [monthIndex, dayIndex];
					}
					break;
				case 'hourToMinute':
					{
						this.dates.push(this.hours);
						this.dates.push(this.minutes);
						this.hours.map((item, index) => {
							if (this.hour == item.substring(0, item.length - 1)) {
								hourIndex = index;
							}
						});
						this.minutes.map((item, index) => {
							if (this.minute == item.substring(0, item.length - 1)) {
								minuteIndex = index;
							}
						});
						this.value = [hourIndex, minuteIndex];
					}
					break;
				case 'minuteToSecond':
					{
						this.dates.push(this.minutes);
						this.dates.push(this.seconds);
						this.minutes.map((item, index) => {
							if (this.minute == item.substring(0, item.length - 1)) {
								minuteIndex = index;
							}
						});
						this.seconds.map((item, index) => {
							if (this.second == item.substring(0, item.length - 1)) {
								secondIndex = index;
							}
						});
						this.value = [minuteIndex, secondIndex];
					}
					break;
				case 'date':
					{
						this.dates.push(this.years);
						this.dates.push(this.months);
						this.dates.push(this.days);
						this.years.map((item, index) => {
							if (this.year == item.substring(0, 4)) {
								yearIndex = index;
							}
						});
						this.months.map((item, index) => {
							if (this.month == item.substring(0, item.length - 1)) {
								monthIndex = index;
							}
						});
						this.days.map((item, index) => {
							if (this.day == item.substring(0, item.length - 1)) {
								dayIndex = index;
							}
						});
						this.value = [yearIndex, monthIndex, dayIndex];
					}
					break;
				case 'time':
					{
						this.dates.push(this.hours);
						this.dates.push(this.minutes);
						this.dates.push(this.seconds);
						this.hours.map((item, index) => {
							if (this.hour == item.substring(0, item.length - 1)) {
								hourIndex = index;
							}
						});
						this.minutes.map((item, index) => {
							if (this.minute == item.substring(0, item.length - 1)) {
								minuteIndex = index;
							}
						});
						this.seconds.map((item, index) => {
							if (this.second == item.substring(0, item.length - 1)) {
								secondIndex = index;
							}
						});
						this.value = [hourIndex, minuteIndex, secondIndex];
					}
					break;
				case 'yearToMinute':
					{
						this.dates.push(this.years);
						this.dates.push(this.months);
						this.dates.push(this.days);
						this.dates.push(this.hours);
						this.dates.push(this.minutes);
						this.years.map((item, index) => {
							if (this.year == item.substring(0, 4)) {
								yearIndex = index;
							}
						});
						this.months.map((item, index) => {
							if (this.month == item.substring(0, item.length - 1)) {
								monthIndex = index;
							}
						});
						this.days.map((item, index) => {
							if (this.day == item.substring(0, item.length - 1)) {
								dayIndex = index;
							}
						});
						this.hours.map((item, index) => {
							if (this.hour == item.substring(0, item.length - 1)) {
								hourIndex = index;
							}
						});
						this.minutes.map((item, index) => {
							if (this.minute == item.substring(0, item.length - 1)) {
								minuteIndex = index;
							}
						});
						this.value = [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex];
					}
					break;
				default:
					{
						this.dates.push(this.years);
						this.dates.push(this.months);
						this.dates.push(this.days);
						this.dates.push(this.hours);
						this.dates.push(this.minutes);
						this.dates.push(this.seconds);
						this.years.map((item, index) => {
							if (this.year == item.substring(0, 4)) {
								yearIndex = index;
							}
						});
						this.months.map((item, index) => {
							if (this.month == item.substring(0, item.length - 1)) {
								monthIndex = index;
							}
						});
						this.days.map((item, index) => {
							if (this.day == item.substring(0, item.length - 1)) {
								dayIndex = index;
							}
						});
						this.hours.map((item, index) => {
							if (this.hour == item.substring(0, item.length - 1)) {
								hourIndex = index;
							}
						});
						this.minutes.map((item, index) => {
							if (this.minute == item.substring(0, item.length - 1)) {
								minuteIndex = index;
							}
						});
						this.seconds.map((item, index) => {
							if (this.second == item.substring(0, item.length - 1)) {
								secondIndex = index;
							}
						});
						this.value = [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex, secondIndex];
					}
					break;
			}
		},
		// 日期转为时间戳
		getMillisecond(date) {
			return new Date(date).getTime();
		}
	}
};
</script>

<style></style>
