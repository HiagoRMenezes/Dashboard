import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  Chip
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [metricsList, setMetricsList] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState(null); // Para armazenar a métrica selecionada para edição
  const [formData, setFormData] = useState({
    valorGasto: '',
    visitaPerfil: '',
    comenzarSeguir: '',
    whatsappCliques: '',
    custoPorClique: '0',
    custoPorConversa: '0',
    custoPorSeguidor: '0',
    conversaoPerfil: '0'
  });
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpen(false);
    setSelectedMetric(null);
    resetForm();
  };

  const handleClickOpen = (metric = null) => {
    if (metric) {
      setFormData(metric);
      setImage(metric.image);
      setName(metric.nome);
      setIsActive(metric.estado === "Ativo");
      setSelectedMetric(metric);
    }
    setOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateValues = (newData) => {
    const vg = parseFloat(newData.valorGasto) || 0;
    const vp = parseFloat(newData.visitaPerfil) || 0;
    const cs = parseFloat(newData.comenzarSeguir) || 0;
    const wa = parseFloat(newData.whatsappCliques) || 0;

    return {
      ...newData,
      custoPorClique: vp > 0 ? (vg / vp).toFixed(2) : '0',
      custoPorConversa: wa > 0 ? (vg / wa).toFixed(2) : '0',
      custoPorSeguidor: cs > 0 ? (vg / cs).toFixed(2) : '0',
      conversaoPerfil: vp > 0 ? ((wa / vp) * 100).toFixed(2) : '0'
    };
  };

  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    const calculatedData = calculateValues(newData);
    setFormData(calculatedData);
  };

  const resetForm = () => {
    setFormData({
      valorGasto: '',
      visitaPerfil: '',
      comenzarSeguir: '',
      whatsappCliques: '',
      custoPorClique: '0',
      custoPorConversa: '0',
      custoPorSeguidor: '0',
      conversaoPerfil: '0'
    });
    setImage(null);
    setName('');
    setIsActive(true);
  };

  const handleSave = () => {
    const metricData = {
      ...formData,
      id: selectedMetric ? selectedMetric.id : metricsList.length + 1,
      nome: name,
      estado: isActive ? "Ativo" : "Inativo",
      image: image
    };

    if (selectedMetric) {
      // Atualiza uma métrica existente
      setMetricsList(metricsList.map(metric => (metric.id === selectedMetric.id ? metricData : metric)));
    } else {
      // Adiciona uma nova métrica
      setMetricsList([...metricsList, metricData]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    setMetricsList(metricsList.filter(metric => metric.id !== id));
  };

  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "valorGasto", headerName: "Valor Gasto", flex: 1 },
    { field: "visitaPerfil", headerName: "Visitas no Perfil", flex: 1 },
    { field: "comenzarSeguir", headerName: "Começar a Seguir", flex: 1 },
    { field: "whatsappCliques", headerName: "Cliques no WhatsApp", flex: 1 },
    { field: "custoPorClique", headerName: "Custo por Clique", flex: 1 },
    { field: "custoPorConversa", headerName: "Custo por Conversa", flex: 1 },
    { field: "custoPorSeguidor", headerName: "Custo por Seguidor", flex: 1 },
    { field: "conversaoPerfil", headerName: "Conversão Perfil > Conversa (%)", flex: 1 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.value} color={params.value === "Ativo" ? "success" : "error"} />
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button onClick={() => handleClickOpen(params.row)}>Editar</Button>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="MÉTRICAS DE MARKETING" subtitle="Gerenciamento de Métricas de Marketing" />
      <Box m="40px 0 0 0" height="75vh">
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="add" onClick={() => handleClickOpen()}>
            <AddIcon />
          </IconButton>
        </Stack>

        <DataGrid
          rows={metricsList}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
          onRowClick={(params) => handleClickOpen(params.row)}
        />

        {/* Modal de Cadastro */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Cadastro de Métricas</DialogTitle>
          <DialogContent>
            <Box display="flex" gap="32px" padding="16px">
              {/* Área de imagem e nome */}
              <Box display="flex" flexDirection="column" alignItems="center" width="33%" gap="16px">
                <div style={{ width: 200, height: 200, borderRadius: 8, border: '2px solid #e0e0e0', overflow: 'hidden' }}>
                  {image && <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <Button variant="contained" component="label" fullWidth>
                  Escolher Imagem
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
                <TextField fullWidth label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
              </Box>

              {/* Campos de entrada e cálculo */}
              <Box display="flex" flexDirection="column" width="67%">
                <Stack spacing={2}>
                  <TextField label="Valor Gasto" type="number" value={formData.valorGasto} onChange={(e) => handleInputChange('valorGasto', e.target.value)} fullWidth />
                  <TextField label="Visitas no Perfil" type="number" value={formData.visitaPerfil} onChange={(e) => handleInputChange('visitaPerfil', e.target.value)} fullWidth />
                  <TextField label="Começar a Seguir" type="number" value={formData.comenzarSeguir} onChange={(e) => handleInputChange('comenzarSeguir', e.target.value)} fullWidth />
                  <TextField label="Whatsapp Cliques" type="number" value={formData.whatsappCliques} onChange={(e) => handleInputChange('whatsappCliques', e.target.value)} fullWidth />

                  <TextField label="Custo por Clique" value={`R$ ${formData.custoPorClique}`} InputProps={{ readOnly: true }} fullWidth />
                  <TextField label="Custo por Conversa" value={`R$ ${formData.custoPorConversa}`} InputProps={{ readOnly: true }} fullWidth />
                  <TextField label="Custo por Seguidor" value={`R$ ${formData.custoPorSeguidor}`} InputProps={{ readOnly: true }} fullWidth />
                  <TextField label="Conversão Perfil > Conversa (%)" value={`${formData.conversaoPerfil}%`} InputProps={{ readOnly: true }} fullWidth />
                </Stack>

                <Button
                  variant="contained"
                  onClick={() => setIsActive(!isActive)}
                  sx={{
                    mt: 2,
                    bgcolor: isActive ? 'green' : 'red',
                    color: 'white'
                  }}
                >
                  {isActive ? 'Ativo' : 'Inativo'}
                </Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Contacts;
