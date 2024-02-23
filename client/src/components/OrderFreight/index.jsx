import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './OrderFreight.module.scss'
import * as API from '../../api'

import { ORDER_VALIDATION_SCHEMA } from '../../utils/orderValidationSchema'
import { useEffect, useState } from 'react'

import { VENDOR_LIST } from '../../utils/vendorsData'
import { yellow, descriptionWidth } from '../../stylesConstants'

function OrderFreight({ getOrderData, formikProps }) {
  const [orderId, setOrderId] = useState('')
  // *** order Detail ***
  const [orderList, setOrderList] = useState([])
  const [productCode, setProductCode] = useState('')
  const [productQuantity, setproductQuantity] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [productName, setProductName] = useState('')
  const [vendorPrice, setVendorPrice] = useState('')

  // *** order ship to ***
  const [shippingAddress1, setShippingAddress1] = useState('')
  const [shipCity, setShipCity] = useState('')
  const [shipCompanyName, setShipCompanyName] = useState('')
  const [shipCountry, setShipCountry] = useState('')
  const [shipPostalCode, setShipPostalCode] = useState('')

  // const yellow = {
  //   backgroundColor: 'yellow',
  // }
  // const descriptionWidth = { width: '40%' }

  let orderData = null

  const initialValues = {
    po: '',
    date: new Date().toISOString().split('T')[0],
    ship: '',
    inHand: new Date(),
    vendor: '',
    // gender: GENDERS[0],
    shipTo: '',
    orderNotes: '',
    vendorName: 'Choose Vendor',
    vendorAddress: '',
    vedorDiscount: 0,
  }
  const handleSubmit = (values, formikBag) => {
    console.log('values :>> ', values)
    formikBag.resetForm()
  }

  // old method, must be removed, switched fetch data from hooks
  getOrderData = async ({ target: { value } }) => {
    if (value.length < 5) {
      return
    }
    try {
      //const orderData = await API.getOrder(value);
      const response = await axios.get(
        `http://localhost:5000/api/orders/${value}`,
      )
      const {
        xmldata: { Orders },
      } = response.data
      //console.log(Orders)
      // *** order Detail ***
      const productCodeN = Orders[0].OrderDetails[0].ProductCode[0]
      const productsQuantityN = Orders[0].OrderDetails[0].Quantity[0]
      const vendorPriceN = Orders[0].OrderDetails[0].Vendor_Price[0]
      const totalPriceN = Orders[0].OrderDetails[0].TotalPrice[0]
      const productNameN = Orders[0].OrderDetails[0].ProductName[0]
      setProductCode(productCodeN)
      setproductQuantity(productsQuantityN)
      setTotalPrice(totalPriceN)
      setProductName(productNameN)
      setVendorPrice(vendorPriceN)

      // *** order ship to ***
      const shippingAddress1 = Orders[0].ShipAddress1[0]
      const shipCity = Orders[0].ShipCity[0]
      const shipCompanyName = Orders[0].ShipCompanyName[0]
      const shipCountry = Orders[0].ShipCountry[0]
      const shipPostalCode = Orders[0].ShipPostalCode[0]
      setShipCompanyName(shipCompanyName)
      setShippingAddress1(shippingAddress1)
      setShipCity(shipCity)
      setShipCountry(shipCountry)
      setShipPostalCode(shipPostalCode)

      //console.log(shipPhoneNumberN, shipPhoneNumber);
    } catch (error) {
      console.log(error, 'err')
    }
  }

  useEffect(() => {
    console.log(orderList.length, 'orderList')
    if (orderId.length < 5) {
      return
    }
    axios
      .get(`http://localhost:5000/api/orders/${orderId}`)
      .then((response) => {
        const {
          xmldata: { Orders },
        } = response.data

        const orderDetails = Orders[0].OrderDetails
        console.log(orderDetails)
        setOrderList(orderDetails)
        orderList.map((order) =>
          console.log(
            order.ProductCode[0],
            order.ProductName[0],
            order.Vendor_Price[0],
          ),
        )
        //console.log(orderList)
        // *** order Detail ***
        const productCodeN = Orders[0].OrderDetails[0].ProductCode[0]
        const productsQuantityN = Orders[0].OrderDetails[0].Quantity[0]
        const vendorPriceN = Orders[0].OrderDetails[0].Vendor_Price[0]
        const totalPriceN = Orders[0].OrderDetails[0].TotalPrice[0]
        const productNameN = Orders[0].OrderDetails[0].ProductName[0]
        setProductCode(productCodeN)
        setproductQuantity(productsQuantityN)
        setTotalPrice(totalPriceN)
        setProductName(productNameN)
        setVendorPrice(vendorPriceN)

        // *** order ship to ***
        const shippingAddress1 = Orders[0].ShipAddress1[0]
        const shipCity = Orders[0].ShipCity[0]
        const shipCompanyName = Orders[0].ShipCompanyName[0]
        const shipCountry = Orders[0].ShipCountry[0]
        const shipPostalCode = Orders[0].ShipPostalCode[0]
        setShipCompanyName(shipCompanyName)
        setShippingAddress1(shippingAddress1)
        setShipCity(shipCity)
        setShipCountry(shipCountry)
        setShipPostalCode(shipPostalCode)
      })
      .catch((error) => {
        console.error('GET Error:', error)
      })
  }, [orderId])

  return (
    <div className={styles.orderWrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ORDER_VALIDATION_SCHEMA}
      >
        {(formikProps) => (
          <Form>
            <div className={styles.orderHead}>
              <div className={styles.orderHeadTop}>
                <strong>PURCHASE ORDER</strong>
              </div>
              <div className={styles.orderHeadBottom}>
                <Field
                  as="select"
                  name="vendorName"
                  value={formikProps.values.vendorName}
                  onChange={(event) => {
                    const selectedVendor = VENDOR_LIST.find(
                      (vendor) => vendor.name === event.target.value,
                    )
                    formikProps.setFieldValue('vendorName', event.target.value)
                    formikProps.setFieldValue(
                      'vendorAddress',
                      selectedVendor.address,
                    )
                    formikProps.setFieldValue(
                      'vedorDiscount',
                      selectedVendor.discount,
                    )
                  }}
                  className="form-select"
                  aria-label="Default select example"
                >
                  {VENDOR_LIST.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Customer</th>
                  <th scope="col">General Info</th>
                  {/* <th scope="col">Handle</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>xyzDisplays </div>
                    <div>170 Changebridge Rd. Bldg A7 </div>
                    <div>Montville, NJ 07045</div>
                    <div>973-515-5151 </div>
                    <div>sales@xyzDisplays.com</div>
                  </td>
                  <td>
                    <div className="input-group mb-3">
                      <span className="input-group-text">P.O. #:</span>
                      {/* <Field
                        name="po"
                        type="number"
                        value={formikProps.values.po}
                        onChange={formikProps.handleChange}
                        onKeyUp={getOrderData}
                        className="form-control"
                        placeholder="Enter P.O. Number"
                        aria-label="po"
                        aria-describedby="basic-addon1"
                      /> */}
                      {/* <Field
                        name="po"
                        type="number"
                        value={formikProps.values.po}
                        onChange={formikProps.handleChange}
                        onKeyUp={getOrderData}
                        className="form-control"
                        placeholder="Enter P.O. Number"
                        aria-label="po"
                        aria-describedby="basic-addon1"
                      /> */}
                      <Field
                        name="po"
                        type="number"
                        className="form-control"
                        value={formikProps.values.po}
                        onChange={(e) => {
                          formikProps.handleChange(e)
                          //console.log(e.target.value)
                          setOrderId(e.target.value) // Fetch data on change
                        }}
                      />
                      <ErrorMessage
                        name="po"
                        className={styles.errorDiv}
                        component="div"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Date:</span>
                      <input
                        defaultValue={initialValues.date}
                        name="date"
                        type="date"
                        className="form-control"
                        placeholder="Choose Date"
                        aria-label="date"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Ship Info:</span>
                      <input
                        name="ship"
                        type="text"
                        value={formikProps.values.ship}
                        onChange={formikProps.handleChange}
                        className="form-control"
                        placeholder="Choose freight info, example Freight"
                        aria-label="ship"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text inHand">
                        In Hand Date:
                      </span>
                      <input
                        style={yellow}
                        name="inHand"
                        type="date"
                        value={formikProps.values.inHand}
                        onChange={formikProps.handleChange}
                        className="form-control"
                        placeholder="Choose in hand date"
                        aria-label="inHand"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="col">Vendor</th>
                  <th scope="col">Ship To</th>
                </tr>
                <tr>
                  <td className={styles.myTd}>
                    {/* <span>{` ${shipFirstName} ${shipLastName} \n ${shipPhoneNumber} `}</span> */}
                    {formikProps.values.vendorAddress}
                    {/* <textarea
                      name="vendor"
                      id="vendor"
                      cols="50"
                      rows="10"
                      value={formikProps.values.vendorAddress}
                    ></textarea> */}
                  </td>
                  <td className={styles.myTd}>
                    {shipCompanyName} <br />
                    {shippingAddress1} <br />
                    {shipCity} <br />
                    {shipCountry} <br />
                    {shipPostalCode}
                    {/* <textarea
                      name="shipTo"
                      id="shipTo"
                      cols="50"
                      rows="10"
                      value={`${shipCompanyName}\n${shippingAddress1}\n${shipCity}\n${shipCountry}\n${shipPostalCode}`}
                    ></textarea> */}
                    {/* <textarea
                      name="shipTo"
                      id="shipTo"
                      cols="50"
                      rows="10"
                      value={formikProps.values.shipTo}
                    ></textarea> */}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <textarea
                      className={styles.notes}
                      name="orderNotes"
                      id="orderNotes"
                      cols="50"
                      rows="3"
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Cost per Unit (USD)</th>
                  <th scope="col">Discounted Cost per Unit (USD)</th>
                  <th scope="col">Amount (USD)</th>
                </tr>
              </thead>
              <tbody>
                {/* {JSON.stringify(orderList, null, 2)} */}
                {orderList.length !== 0 &&
                  orderList.map((o, i) => (
                    <tr key={i}>
                      <td>{o.ProductCode?.[0]}</td>
                      <td>{o.ProductName?.[0]}</td>
                      <td>{o.Quantity?.[0]}</td>
                      {/* <td>{`$${Number(o.Vendor_Price?.[0]).toFixed(2)}`}</td> */}
                      <td>{isNaN(Number(o.Vendor_Price?.[0])) ? '': `$${Number(o.Vendor_Price?.[0]).toFixed(2)}` }</td>
                      <td> Calculate discounted price here  </td>
                      <td>  Calculate amount here  </td>
                    </tr>
                  ))}
                {/* {orderList.map((o, i) => (
                  <tr key={i}>
                    <td >{o.ProductCode[0]}</td>
                    <td >{o.ProductName[0]}</td>
                    <td >{o.Vendor_Price[0]}</td>
                    <td>discounted price</td>
                    <td>amount</td>
                  </tr>
                ))} */}
                <tr>
                  {/* {orderList.map((p, i) => (
                    <td key={i}>{p.productCode}</td>
                  ))} */}
                  <td>{productCode}</td>
                  <td style={descriptionWidth}>{productName}</td>
                  <td>{productQuantity}</td>
                  <td>{`$${Number(vendorPrice).toFixed(2)}`}</td>
                  <td>{`$${Number(
                    vendorPrice * formikProps.values.vedorDiscount,
                  ).toFixed(2)}`}</td>
                  <td>{`$${Number(
                    vendorPrice *
                      formikProps.values.vedorDiscount *
                      productQuantity,
                  ).toFixed(2)}`}</td>
                </tr>
                <tr className="table-success">
                  <td colSpan="4"></td>
                  <td>Total Amount:</td>
                  <td>$0.00</td>
                </tr>
              </tbody>
            </table>
            <button type="submit" className="btn btn-primary">
              New Email
            </button>
          </Form>
        )}
      </Formik>
      <a
        href="mailto:user@example.com?
    subject=MessageTitle&amp;
    body=Message Content"
      >
        Contact Us
      </a>
    </div>
  )
}

export default OrderFreight
