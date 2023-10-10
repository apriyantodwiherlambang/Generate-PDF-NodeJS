const { createInvoice } = require("./createInvoice.js");
const { getTransactionById } = require("./db.js");

const transactionId = "149"; // Replace with the actual transaction ID

//index.js
getTransactionById(transactionId)
  .then((invoiceData) => {
    console.log("Invoice Data:", invoiceData);

    if (invoiceData && invoiceData.length > 0) {
      const customerInfo = invoiceData[0];
      const invoice = {
        shipping: {
          name: customerInfo.customer_name,
          address: "", // Tambahkan alamat pelanggan jika tersedia
          city: "", // Tambahkan kota pelanggan jika tersedia
          state: "", // Tambahkan provinsi pelanggan jika tersedia
          country: "", // Tambahkan negara pelanggan jika tersedia
        },
        items: [
          {
            item: customerInfo.title,
            description: `${customerInfo.weight}g`,
            quantity: 1,
            amount: customerInfo.price,
          },
        ],
        subtotal: customerInfo.price,
        paid: 0,
        invoice_nr: customerInfo.invoice || "Nomor Invoice Tidak Tersedia",
      };

      createInvoice(invoice, "invoice.pdf");
    } else {
      throw new Error(`No data found for transaction ID ${transactionId}`);
    }
  })
  .catch((error) => {
    console.error(error.message);
  });
