
// class 可以解决

// 属性多，方法少的场景
interface Product {
  id: number;
  name: string;
  price: number;
  count: number;
  // 不确定类型
  //mark?: string;
  // 可索引类型
  [key: string]: any;
  // 函数
  transfer: () => void
}

function calToal(product: Product) {
  console.log("product总价:", product.price * product.count)
  product.transfer();
}

calToal({
  id: 100, name: "电脑", price: 5000, count: 10,
  mark: "注意轻纺", place: "", quatity: "二手",
  transfer() {
    console.log(this.name, "运输");
  }
})

interface Getter {
  // 可索引类型 key 是 string 类型，value 是函数
  // 限定 value 参数 为 state,并且 类型为any
  [key: string]: (state: any) => void
}

let getter: Getter = {
  getProductInfo(state: string) {

  },
  getOneProduct(state: string) {

  }
}


export { }