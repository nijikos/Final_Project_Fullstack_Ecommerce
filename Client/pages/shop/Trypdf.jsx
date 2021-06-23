import React, { Component, PropTypes } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceDetails from "./InvoiceDetails";

class Qu extends Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      let imgWidth = 208;
      let imgHeight = 100;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <div>
        <div id='divToPrint' className='mt4'>
          <div>Title of Component</div>
          <div>
            <h1>hiiiiiiiiiiiiiiiii</h1>
            <h1>hiiiiiiiiiiiiiiiii</h1>
            <h1>hiiiiiiiiiiiiiiiii</h1>
            <h1>hiiiiiiiiiiiiiiiii</h1>
            <h1>hiiiiiiiiiiiiiiiii</h1>
            <h1>hiiiiiiiiiiiiiiiii</h1>
            <h1>hiiiiiiiiiiiiiiiii</h1>
          </div>
          <div className='mb5'>
            <button onClick={this.printDocument}>Print</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Qu;

// import React, { Component } from "react";
// import jsPDF from "jspdf";
// const dateFormat = require("dateformat");

// export class Trypdf extends Component {
//   printDocument = () => {
//     let invoiceData = this.props.invoiceData;
//     let invoiceArray = this.props.invoiceArray;
//     var doc = new jsPDF("p", "pt", "a4", "false");
//     doc.setFontSize(28);
//     doc.text("FNICHURE (invoice)", 40, 50);
//     doc.setFontSize(12);
//     doc.text(
//       "================================================================",
//       40,
//       70
//     );
//     doc.setFontSize(12);
//     doc.text(invoiceData.invoice_code, 40, 88);
//     doc.text(
//       "Created Time: " + dateFormat(invoiceData.created_time, "longDate"),
//       40,
//       104
//     );
//     doc.text(
//       "Expiry Time: " + dateFormat(invoiceData.expired_time, "longDate"),
//       40,
//       120
//     );
//     doc.text("Status : paid", 40, 136);
//     doc.text(invoiceData.first_name + " " + invoiceData.last_name, 40, 168);
//     doc.text(invoiceData.email, 40, 184);
//     doc.text(invoiceData.phone, 40, 200);
//     doc.text(invoiceData.address, 40, 216);
//     doc.text(invoiceData.city, 40, 232);
//     doc.text(invoiceData.postal_code, 40, 248);
//     doc.text(
//       "================================================================",
//       40,
//       300
//     );
//     doc.text("ITEM", 40, 316);
//     doc.text("PRICE", 420, 316);
//     doc.text(
//       "================================================================",
//       40,
//       332
//     );
//     doc.text("ITEM", 40, 348);
//     doc.text("PRICE", 420, 348);
//     doc.text("ITEM", 40, 364);
//     doc.text("PRICE", 420, 364);
//     doc.save("myDocument.pdf");
//     for (let i = 0; i < invoiceArray.length; i++) {
//       return doc.text("ITEM", 40, 348);
//     }
//   };

//   render() {
//     console.log("props trypdf ", this.props);
//     return (
//       <div>
//         <h2>Hello</h2>
//         <p>this is paragraph</p>
//         <button onClick={this.printDocument}>download pdf</button>
//       </div>
//     );
//   }
// }

// export default Trypdf;
