export default function DisplayResult(props) {
  let orderDataArr = [];
  for (const [key, value] of Object.entries(props.orderData[0])) {
    orderDataArr[key] = value;
  }
  let count = orderDataArr.length
  let classColSpan = [];
  classColSpan[count] = `col-span-${count}`;

  let total = 0;
  const dataPrint = orderDataArr.map((order, index) => {
    total += (index * order);
    return (
      <div key={total} className="text-right text-slate-700">
        {order} X {index}
      </div>
    )
  }
  )

  return (
    <div className="container pt-10 ">
      <div className="flex w-full border-2 p-2 rounded-md border-green-200">
        <div className="grid w-full grid-cols-2 divide-x p-2 gap-4">
          <div className='text-xl text-right'>
            <label>Order Details</label>
          </div>
          <div className="border-black-400">
            {
              dataPrint
            }
          </div>
          <div className='border-0 text-md text-right'>
            <label>Total</label>
          </div>
          <div className="border-0 text-right text-slate-700">
            {
              total
            }
          </div>
        </div>
      </div>
    </div>
  )
}
