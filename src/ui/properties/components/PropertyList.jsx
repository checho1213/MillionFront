import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPropertiesThunk,
  fetchFilteredPropertiesThunk,
} from "../state/propertySlice";
import TitleComponent from "../../../shared/components/panelPrincipal";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";

const PropertyList = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.properties);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchPropertiesThunk());
    initFilters();
  }, [dispatch]);

  const [filtersPanel, setFiltersPanel] = useState({
    owner: "",
    name: "",
    address: "",
    maxPrice: "",
  });

  const [propertyDetails, setPropetyDetails] = useState({
    owner: "",
    name: "",
    address: "",
    price: "",
    images: [],
    idProperty: "",
  });

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item) => {
    return (
      <img src={item.file} alt={item.alt} style={{ width: "100%" }} />
    );
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const newProduct = () => {
    alert("Hoka");
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      address: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue("");
  };

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const formatCurrency = (value) => {
    return value
      ? value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target ? e.target : e.value;
    setFiltersPanel((prev) => ({ ...prev, [id]: value }));
  };

  const handleSearch = () => {
    dispatch(fetchFilteredProperties(filtersPanel));
  };

  const clearFiltersPanel = () => {
    setFiltersPanel({
      owner: "",
      name: "",
      address: "",
      maxPrice: "",
    });
    dispatch(fetchFilteredProperties({})); // recarga sin filtros
  };

  const fetchFilteredProperties = async (filters) => {
    dispatch(fetchFilteredPropertiesThunk(filters));
  };

  const clearFilter = () => {
    initFilters();
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="limpiar"
          outlined
          severity="help"
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const showProperty = (data) => {    
    setPropetyDetails({
      name: data.name,
      owner: data.owner.name,
      price: data.price,
      address: data.address,
      idProperty: data.idProperty,
      images: data.images
    });
    console.log(propertyDetails);
    setVisible(true);
  };
  const openPanel = (rowData) => {
    return (
      <Button
        type="button"
        icon="pi pi-file-edit"
        className="p-button-sm p-button-text"
        onClick={() => showProperty(rowData)}
      />
    );
  };
  const header = renderHeader();
  return (
    <>
      <TitleComponent
        titlePrimary="Dashboard Propiedades"
        titleSecondary="Podrá consultar, visualizar y administrar todas las propiedades registradas en el sistema."
        newData={newProduct}
      ></TitleComponent>
      <Card
        title="Formulario de búsqueda"
        subTitle="Diligencie el grupo de parámetros que considere para consultar las propiedades de su interés."
      >
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <div className="flex flex-column gap-2 m-2">
              <label htmlFor="owner">Propietario</label>
              <InputText
                id="owner"
                aria-describedby="owner-help"
                value={filtersPanel.owner}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="flex flex-column gap-2 m-2">
              <label htmlFor="name">Nombre de la propiedad</label>
              <InputText
                id="name"
                aria-describedby="name-help"
                value={filtersPanel.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="flex flex-column gap-2 m-2">
              <label htmlFor="address">Dirección de la propiedad</label>
              <InputText
                id="address"
                aria-describedby="address-help"
                value={filtersPanel.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="flex flex-column gap-2 m-2">
              <label htmlFor="maxPrice">Precio Máximo</label>
              <InputText
                inputId="maxPrice"
                id="maxPrice"
                aria-describedby="price-help"
                value={filtersPanel.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3 ml-auto">
            <div className="flex flex-column gap-2 m-2">
              <Button
                type="button"
                icon="pi pi-search"
                label="Consultar"
                severity="primary"
                onClick={handleSearch}
              />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <div className="flex flex-column gap-2 m-2">
              <Button
                label="Borrar filtros de búsqueda"
                icon="pi pi-eraser"
                severity="help"
                onClick={clearFiltersPanel}
                text
              />
            </div>
          </div>
        </div>
      </Card>
      <br></br>
      <Card subTitle="Resultados de la búsqueda.">
        <div className="card">
          <DataTable
            value={items}
            paginator
            showGridlines
            rows={10}
            loading={loading}
            dataKey="id"
            filters={filters}
            globalFilterFields={["name", "address", "owner.name"]}
            header={header}
            emptyMessage="No hay propiedades encontradas."
            onFilter={(e) => setFilters(e.filters)}
          >
            <Column
              field="name"
              header="Nombre"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="address"
              header="Dirección"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="owner.name"
              header="Propietario"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="price"
              header="Precio"
              filter
              dataType="numeric"
              body={balanceBodyTemplate}
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />

            <Column
              header="Detalles"
              body={openPanel}
              filterPlaceholder="Search by name"
              style={{ minWidth: "1rem" }}
            />
          </DataTable>
        </div>
      </Card>

      <Dialog
        header={`Detalle de la propiedad, id ${propertyDetails.idProperty}`}
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="surface-100 p-4 border-round mb-4">
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-3">
              <div className="text-500 text-sm mb-1">Propietario</div>
              <div className="text-900 font-medium">
                {propertyDetails.owner}
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <div className="text-500 text-sm mb-1">Nombre</div>
              <div className="text-900 font-medium">{propertyDetails.name}</div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <div className="text-500 text-sm mb-1">Dirección</div>
              <div className="text-900 font-medium">
                {propertyDetails.address}
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
              <div className="text-500 text-sm mb-1">Precio</div>
              <div className="text-900 font-medium">
                ${propertyDetails.price?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-content-center">
          <Galleria
            value={propertyDetails.images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            style={{ maxWidth: "450px" }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        </div>
      </Dialog>
    </>
  );
};

export default PropertyList;
