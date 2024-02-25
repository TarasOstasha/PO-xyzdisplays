import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ORDER_VALIDATION_SCHEMA } from '../../utils/orderValidationSchema';
import { VENDOR_LIST } from '../../utils/vendorsData';
import { yellow, descriptionWidth, attension } from '../../stylesConstants'


import styles from './OrderFreightForm.module.scss';

function OrderFreightForm ({ setOrderId, shipCompanyName, shippingAddress1, shipCity, shipCountry, shipPostalCode, rerenderOrderList }) {


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
    vedorDiscount: 0
  }
  const handleSubmit = (values, formikBag) => {
    console.log('values :>> ', values)
    formikBag.resetForm()
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ORDER_VALIDATION_SCHEMA}
      >
        {formikProps => (
          <Form>
            <div className={styles.orderHead}>
              <div className={styles.orderHeadTop}>
                <strong>PURCHASE ORDER</strong>
              </div>
              <div className={styles.orderHeadBottom}>
                <Field
                  as='select'
                  name='vendorName'
                  value={formikProps.values.vendorName}
                  onChange={event => {
                    const selectedVendor = VENDOR_LIST.find(
                      vendor => vendor.name === event.target.value
                    )
                    formikProps.setFieldValue('vendorName', event.target.value)
                    formikProps.setFieldValue(
                      'vendorAddress',
                      selectedVendor.address
                    )
                    formikProps.setFieldValue(
                      'vedorDiscount',
                      selectedVendor.discount
                    )
                  }}
                  className='form-select'
                  aria-label='Default select example'
                >
                  {VENDOR_LIST.map((v, i) => (
                    <option key={i} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Customer</th>
                  <th scope='col'>General Info</th>
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
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>P.O. #:</span>
                      <Field
                        name='po'
                        type='number'
                        className='form-control'
                        value={formikProps.values.po}
                        onChange={e => {
                          formikProps.handleChange(e)
                          setOrderId(e.target.value)
                        }}
                      />
                      <ErrorMessage
                        name='po'
                        className={styles.errorDiv}
                        component='div'
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Date:</span>
                      <input
                        defaultValue={initialValues.date}
                        name='date'
                        type='date'
                        className='form-control'
                        placeholder='Choose Date'
                        aria-label='date'
                        aria-describedby='basic-addon1'
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text'>Ship Info:</span>
                      <input
                        name='ship'
                        type='text'
                        value={formikProps.values.ship}
                        onChange={formikProps.handleChange}
                        className='form-control'
                        placeholder='Choose freight info, example Freight'
                        aria-label='ship'
                        aria-describedby='basic-addon1'
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <span className='input-group-text inHand'>
                        In Hand Date:
                      </span>
                      <input
                        style={yellow}
                        name='inHand'
                        type='date'
                        value={formikProps.values.inHand}
                        onChange={formikProps.handleChange}
                        className='form-control'
                        placeholder='Choose in hand date'
                        aria-label='inHand'
                        aria-describedby='basic-addon1'
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope='col'>Vendor</th>
                  <th scope='col'>Ship To</th>
                </tr>
                <tr>
                  <td className={styles.myTd}>
                    {formikProps.values.vendorAddress}
                  </td>
                  <td className={styles.myTd}>
                    {shipCompanyName} <br />
                    {shippingAddress1} <br />
                    {shipCity} <br />
                    {shipCountry} <br />
                    {shipPostalCode}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Order Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <textarea
                      className={styles.notes}
                      name='orderNotes'
                      id='orderNotes'
                      cols='50'
                      rows='3'
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Item</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Qty</th>
                  <th scope='col'>Cost per Unit (USD)</th>
                  <th scope='col'>Discounted Cost per Unit (USD)</th>
                  <th scope='col'>Amount (USD)</th>
                </tr>
              </thead>
              <tbody>
                {/* {JSON.stringify(orderList, null, 2)} */}
                {rerenderOrderList.length !== 0 &&
                  rerenderOrderList.map((o, i) => (
                    <tr key={i}>
                      <td>{o.ProductCode?.[0]}</td>
                      <td style={descriptionWidth}>{o.ProductName?.[0]}</td>
                      <td>{o.Quantity?.[0]}</td>
                      <td>
                        {isNaN(Number(o.Vendor_Price?.[0]))
                          ? ''
                          : `$${Number(o.Vendor_Price?.[0]).toFixed(2)}`}
                      </td>
                      <td>
                        {isNaN(Number(o.Vendor_Price?.[0])) ||
                        isNaN(Number(o.discount)) ? (
                          <b style={attension}>Website order item</b>
                        ) : (
                          `$${(o.Vendor_Price?.[0] * o.discount).toFixed(2)}`
                        )}
                      </td>
                      <td>
                        {o.Vendor_Price?.[0] && o.discount && o.Quantity?.[0]
                          ? `${(
                              o.Vendor_Price?.[0] *
                              o.discount *
                              o.Quantity?.[0]
                            ).toFixed(2)}`
                          : ''}
                      </td>
                    </tr>
                  ))}
                <tr className='table-success'>
                  <td colSpan='4'></td>
                  <td>Total Amount: </td>
                  <td>{}</td>
                </tr>
              </tbody>
            </table>
            <button type='submit' className='btn btn-primary'>
              New Email
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default OrderFreightForm
