class MyArr extends Array {

	constructor(arr) {
		super()
		this.arr = arr
	}
	
	everyOther() {
		return this.arr.filter((item, i) => (i % 2 === 0) && item)
}
}

const arr = new MyArr([1,2,3,4,5,6,7,8])
console.log(arr.everyOther())
