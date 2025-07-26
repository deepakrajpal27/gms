import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { getInventory, InventoryItem } from '../api/inventoryApi';
import { useNotification } from '../context/NotificationContext';
import { createProduct, ProductPayload, deleteProduct, updateProduct } from '../api/productApi';
import { getCategories, Category } from '../api/categoryApi';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const Inventory: React.FC = () => {
  const { showNotification } = useNotification();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<ProductPayload>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    quantity: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInventory();
      setItems(data);
    } catch (err: any) {
      setError('Failed to load inventory');
      showNotification(err?.response?.data?.message || 'Failed to load inventory', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch {
        showNotification('Failed to load categories', 'error');
      }
    };
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenAdd = () => {
    setForm({ name: '', description: '', price: 0, categoryId: 0, quantity: 0 });
    setAddOpen(true);
  };
  const handleCloseAdd = () => {
    setAddOpen(false);
    setEditingId(null);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' || name === 'categoryId' ? Number(value) : value
    }));
  };
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        showNotification('Product updated!', 'success');
      } else {
        await createProduct(form);
        showNotification('Product created!', 'success');
      }
      setAddOpen(false);
      setEditingId(null);
      fetchItems();
    } catch (err: any) {
      showNotification(err?.response?.data?.message || 'Failed to save product', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (item: InventoryItem) => {
    if (!window.confirm(`Delete product '${item.product.name}'?`)) return;
    try {
      await deleteProduct(item.product.id);
      showNotification('Product deleted!', 'success');
      fetchItems();
    } catch (err: any) {
      showNotification(err?.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  const handleEditProduct = (item: InventoryItem) => {
    setForm({
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      categoryId: item.product.category.id,
      quantity: item.quantity,
    });
    setAddOpen(true);
    setEditingId(item.product.id);
  };

  return (
    <PageContainer>
      <Typography variant="h4" component="h1" className="page-title">
        Inventory
      </Typography>
      <Typography variant="body1" className="page-content">
        Track your inventory levels here.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenAdd} sx={{ mb: 2 }}>
        Add Product
      </Button>
      <Dialog open={addOpen} onClose={handleCloseAdd} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Update Product' : 'Add Product'}</DialogTitle>
        <form onSubmit={handleAddProduct}>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
              inputProps={{ min: 0, step: 1 }}
            />
            <TextField
              select
              label="Category"
              name="categoryId"
              value={form.categoryId}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
            >
              <MenuItem value={0} disabled>Select category</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} disabled={formLoading}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={formLoading}>
              {formLoading
                ? (editingId ? 'Updating...' : 'Adding...')
                : (editingId ? 'Update Product' : 'Add Product')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {loading && (
        <Box className="inventory-loader">
          <CircularProgress />
        </Box>
      )}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price ($)</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No inventory items found.</TableCell>
                </TableRow>
              ) : (
                items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.product.description}</TableCell>
                    <TableCell>{item.product.category.name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.product.price}</TableCell>
                    <TableCell align="center">
                      <Button size="small" color="primary" onClick={() => handleEditProduct(item)}><EditIcon fontSize="small" /></Button>
                      <Button size="small" color="error" onClick={() => handleDeleteProduct(item)}><DeleteIcon fontSize="small" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </PageContainer>
  );
};

export default Inventory;
