import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

import { createOrder } from "../../Adminapi/ordersAdmin";

const steps = ["Customer", "Items", "Fulfillment", "Payment", "Summary"];
const GST_RATE = 0.18;

export default function AddOrder() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  /* ================= STATE ================= */
  const [customerType, setCustomerType] = useState("existing");
  const [customer, setCustomer] = useState("");

  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const [fulfillment, setFulfillment] = useState("delivery");
  const [address, setAddress] = useState("");

  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");

  /* ================= CALCULATIONS ================= */
  const subTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const gstAmount = useMemo(
    () => +(subTotal * GST_RATE).toFixed(2),
    [subTotal]
  );

  const grandTotal = useMemo(
    () => +(subTotal + gstAmount).toFixed(2),
    [subTotal, gstAmount]
  );

  /* ================= HELPERS ================= */
  const addItem = () => {
    if (!product || qty <= 0 || price <= 0) return;

    setItems([...items, { product, qty, price }]);
    setProduct("");
    setQty(1);
    setPrice(0);
  };

  /* ================= VALIDATION ================= */
  const validateStep = () => {
    setError("");

    if (activeStep === 0 && !customer) {
      setError("Customer is required");
      return false;
    }

    if (activeStep === 1 && items.length === 0) {
      setError("Add at least one item");
      return false;
    }

    if (activeStep === 2 && fulfillment === "delivery" && !address) {
      setError("Delivery address required");
      return false;
    }

    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setActiveStep((s) => s + 1);
  };

  const back = () => setActiveStep((s) => s - 1);

  /* ================= SUBMIT ================= */
  const handleCreateOrder = async () => {
    setSubmitting(true);

    const payload = {
      customerType,
      customer,
      fulfillment,
      address,
      paymentMethod: payment,
      totalAmount: subTotal,
      gstAmount,
      grandTotal,
      items: items.map((i) => ({
        product: i.product,
        quantity: i.qty,   // ✅ backend match
        price: i.price,
      })),
    };

    try {
      await createOrder(payload);
      alert("Order created successfully");
      setActiveStep(0);
      setItems([]);
      setCustomer("");
    } catch (err) {
      alert("Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Add Order
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((s) => (
          <Step key={s}>
            <StepLabel>{s}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {/* STEP 1 – CUSTOMER */}
        {activeStep === 0 && (
          <>
            <RadioGroup
              row
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
            >
              <FormControlLabel value="existing" control={<Radio />} label="Existing" />
              <FormControlLabel value="new" control={<Radio />} label="New" />
            </RadioGroup>

            <TextField
              fullWidth
              label="Customer name / email"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              sx={{ mt: 2 }}
            />
          </>
        )}

        {/* STEP 2 – ITEMS */}
        {activeStep === 1 && (
          <>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="Product" value={product} onChange={(e) => setProduct(e.target.value)} />
              <TextField type="number" label="Qty" value={qty} onChange={(e) => setQty(+e.target.value)} sx={{ width: 80 }} />
              <TextField type="number" label="Price" value={price} onChange={(e) => setPrice(+e.target.value)} sx={{ width: 120 }} />
              <Button variant="contained" onClick={addItem}>Add</Button>
            </Box>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((i, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{i.product}</TableCell>
                    <TableCell>{i.qty}</TableCell>
                    <TableCell>₹{i.price}</TableCell>
                    <TableCell>₹{i.qty * i.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Typography mt={2} fontWeight={600}>
              Subtotal: ₹{subTotal}
            </Typography>
          </>
        )}

        {/* STEP 3 – FULFILLMENT */}
        {activeStep === 2 && (
          <>
            <RadioGroup value={fulfillment} onChange={(e) => setFulfillment(e.target.value)}>
              <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
              <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
            </RadioGroup>

            {fulfillment === "delivery" && (
              <TextField
                fullWidth
                label="Delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}
          </>
        )}

        {/* STEP 4 – PAYMENT */}
        {activeStep === 3 && (
          <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
            <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel value="online" control={<Radio />} label="Online Payment" />
          </RadioGroup>
        )}

        {/* STEP 5 – SUMMARY */}
        {activeStep === 4 && (
          <>
            <Typography fontWeight={700}>Order Summary</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography>Customer: {customer}</Typography>
            <Typography>Payment: {payment}</Typography>
            <Typography>Fulfillment: {fulfillment}</Typography>

            <Divider sx={{ my: 2 }} />

            {items.map((i, idx) => (
              <Typography key={idx}>
                {i.product} × {i.qty} = ₹{i.qty * i.price}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography>Subtotal: ₹{subTotal}</Typography>
            <Typography>GST (18%): ₹{gstAmount}</Typography>
            <Typography fontWeight={700}>Grand Total: ₹{grandTotal}</Typography>
          </>
        )}

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={back}>
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="success"
              disabled={submitting}
              onClick={handleCreateOrder}
            >
              {submitting ? "Creating..." : "Confirm & Create Order"}
            </Button>
          ) : (
            <Button variant="contained" onClick={next}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
