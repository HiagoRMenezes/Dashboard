import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, Stack, TextField
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  let user = useState()

  const handleCloseDelete = async (props) => {
       setOpenDelete(false);

    };

  const handleClickOpenDelete = async (props) => {
       setOpenDelete(true);
    };

  const handleClose = async (props) => {
       setOpen(false);

    };

  const handleClickOpen = async (props) => {
       setOpen(true);
    };


    function _Change(campo, value) {
        switch (campo) {
            case "NM_USUARIO":
                user.NM_USUARIO = value;

                console.log("SETA NM USER");
                break;

            case "DM_EMAIL_USUARIO":
                user.DM_EMAIL_USUARIO = value


                console.log("SETA DM_EMAIL_USUARIO");
                console.log(user.DM_EMAIL_USUARIO);
                break;

            case "DS_SENHA_USUARIO":
                user.DS_SENHA_USUARIO = value;

                console.log("SETA DS_SENHA_USUARIO");
                break;

            case "NR_CONTRATO":
                user.NR_CONTRATO= value;


                console.log("SETA NR_CONTRATO");
                break;

        }
    }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
          <Stack direction="row" spacing={1}>
              <IconButton aria-label="add" onClick={handleClickOpen}>
                  <AddIcon/>
              </IconButton>
              {/*<IconButton aria-label="edit" onClick={handleClickOpenEdit}>*/}
              {/*    <EditIcon/>*/}
              {/*</IconButton>*/}
              <IconButton aria-label="delete" onClick={handleClickOpenDelete}>
                  <DeleteIcon/>
              </IconButton>
          </Stack>
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Tela de cadastro</DialogTitle>
              <DialogContent>
                  <Box
                      component="form"
                      sx={{
                          '& .MuiTextField-root': {m: 1, width: '25ch'},
                      }}
                      noValidate
                      autoComplete="off"
                  >
                      <div>
                          <TextField
                              required
                              id="ID_USUARIO"
                              label="ID de Usuário"
                              value={user.ID_USUARIO}
                              disabled
                              onChange={(event) => _Change("ID_USUARIO", event.target.value)}
                          />
                          <TextField
                              required
                              id="NM_USUARIO"
                              label="Nome de Usuário"
                              value={user.NM_USUARIO}
                              onChange={(event) => _Change("NM_USUARIO", event.target.value)}
                              // disabled = {edita}
                          />
                          <TextField
                              required
                              id="DM_EMAIL_USUARIO"
                              label="Email de usuário"
                              value={user.DM_EMAIL_USUARIO}
                              onChange={(event) => _Change("DM_EMAIL_USUARIO", event.target.value)}
                          />
                          <TextField
                              required
                              id="DS_SENHA_USUARIO"
                              label="Senha de usuário"
                              value={user.DS_SENHA_USUARIO}
                              type="password"
                              autoComplete="on"
                              onChange={(event) => _Change("DS_SENHA_USUARIO", event.target.value)}
                          />
                          <TextField
                              required
                              id="NR_CONTRATO"
                              label="NR de Contrato"
                              value={user.NR_CONTRATO}
                              onChange={(event) => _Change("NR_CONTRATO", event.target.value)}
                              disabled
                          />
                      </div>
                  </Box>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Salvar</Button>
              </DialogActions>
          </Dialog>
          <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {"Tela de usuário"}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Você tem certeza que deseja remover este usuário?
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseDelete}>Cancelar</Button>
                  <Button onClick={handleCloseDelete} autoFocus>
                      Confirmar
                  </Button>
              </DialogActions>
          </Dialog>
      </Box>
    </Box>
  );
};

export default Contacts;
