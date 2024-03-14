const fs = require("fs");
const PDFDocument = require("pdfkit");

function createBill(bill, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateCustomerInformation(doc, bill);
  generateProductsTable(doc, bill);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path, "utf-8"));
}

function generateCustomerInformation(doc, bill) {
  doc.fillColor("#444444").fontSize(20).text("Bill", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Bill Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(bill._id, 150, customerInformationTop)
    .font("Helvetica")

    .text("Bill Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(formatCurrency(bill.total), 150, customerInformationTop + 30)
    .font("Times-Roman")

    .text("Payment Method:", 50, customerInformationTop + 45)
    .font("Helvetica")

    .text(bill.payment_method, 150, customerInformationTop + 45)
    .font("Helvetica")

    .text("Status", 50, customerInformationTop + 60)
    .font("Times-Roman")

    .text(bill.status ? "Paid" : "Unpaid", 150, customerInformationTop + 60)
    .font("Times-Roman")

    .text(bill.buyer.receiver.name, 300, customerInformationTop)
    .font("Times-Roman")

    .text(bill.buyer.receiver.phone, 300, customerInformationTop + 15)
    .font("Helvetica")

    .text(
      bill.buyer.receiver.detail + ", " + bill.buyer.receiver.address,
      300,
      customerInformationTop + 30,
    )
    .font("Times-Roman")

    .text(bill.buyer.receiver.address, 300, customerInformationTop + 45)

    .moveDown();

  generateHr(doc, 280);
}

function generateProductsTable(doc, bill) {
  let i;
  const billTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    billTableTop,
    "Name",
    "Size",
    "Unit Cost",
    "Quantity",
    "Line Total",
  );
  generateHr(doc, billTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < bill.products.length; i++) {
    const item = bill.products[i];
    const position = billTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name.substring(0, 30) + "...",
      item.size,
      formatCurrency(convert(item.actualPrice)),
      item.quantity,
      formatCurrency(convert(item.actualPrice) * item.quantity),
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = billTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(convert(bill.total) - 30000),
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Shipping fee",
    "",
    formatCurrency(30000),
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(bill.total),
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 },
    );
}

function generateTableRow(doc, y, name, size, unitCost, quantity, lineTotal) {
  doc
    .fontSize(10)
    .text(name, 50, y, { width: 200, align: "center" })
    .text(size, 150, y, { width: 180, align: "center" })
    .text(unitCost, 280, y, { width: 90, align: "center" })
    .text(quantity, 370, y, { width: 90, align: "center" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function convert(VND) {
  return Number(`${VND}`.replaceAll(".", ""));
}

function formatCurrency(VND) {
  const money = new Intl.NumberFormat("en-DE").format(VND);
  return money + " VND";
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createBill,
};
