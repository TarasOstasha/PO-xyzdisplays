import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './OrderFreight.module.scss';
import * as API from '../../api';

function OrderFreight({ getOrderData }) {
  const yellow = {
    backgroundColor: 'yellow',
  }
  const descriptionWidth = { width: '40%' }

  const initialValues = {
    po: '',
    date: new Date().toISOString().split('T')[0],
    ship: '',
    inHand: new Date(),
    vendor: '',
    // gender: GENDERS[0],
    shipTo: '',
    orderNotes: '',
  }
  const handleSubmit = (values, formikBag) => {
    console.log('values :>> ', values, formikBag)
    // formikBag.resetForm();
  }

  getOrderData = ({ target: { value } }) => {
    console.log(value);
  }

  return (
    <div className={styles.orderWrapper}>
      <div className={styles.orderHead}>
        <div className={styles.orderHeadTop}>
          <strong>PURCHASE ORDER</strong>
        </div>
        <div className={styles.orderHeadBottom}>
          <select className="form-select" aria-label="Default select example">
            <option defaultValue="0">Choose Vendor</option>
            <option value="1">TL</option>
            <option value="2">LED</option>
          </select>
        </div>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => (
          <Form>
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
                      <input
                        name="po"
                        type="text"
                        value={formikProps.values.po}
                        onChange={formikProps.handleChange}
                        onKeyUp={getOrderData}
                        className="form-control"
                        placeholder="Enter P.O. Number"
                        aria-label="po"
                        aria-describedby="basic-addon1"
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
                  <td>
                    <textarea
                      name="vendor"
                      id="vendor"
                      cols="50"
                      rows="10"
                    ></textarea>
                  </td>
                  <td>
                    <textarea
                      name="shipTo"
                      id="shipTo"
                      cols="50"
                      rows="10"
                    ></textarea>
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
                <tr>
                  <td>or34503</td>
                  <td style={descriptionWidth}>
                    10ft x 8ft Formulate Master S1 Straight Tension Fabric
                    Backwall Display Double-Sided (Graphic Only)
                  </td>
                  <td>1</td>
                  <td>$654.00</td>
                  <td>$654.00</td>
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
