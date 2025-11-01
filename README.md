# Dashboard de Análisis Energético

Un dashboard interactivo y moderno para visualizar análisis técnico de sistemas de energía renovable.

## 🚀 Características

- **6 KPIs principales**: Visualización de indicadores clave de rendimiento
- **Gráfico de Costos**: Comparación CAPEX vs OPEX por sistema
- **Gráfico de LCOE**: Análisis del costo nivelado de energía
- **Tabla de Diseño**: Especificaciones técnicas detalladas de cada sistema
- **Matriz de Decisión**: Visualización tipo radar para comparación multi-criterio

## 📦 Tecnologías Utilizadas

- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **Recharts** - Biblioteca de gráficos para React
- **Material-UI (MUI)** - Componentes de UI modernos y responsivos
- **Emotion** - Librería CSS-in-JS para estilos

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
/src
├── /components
│   ├── KpiCard.jsx         # Tarjeta para KPIs
│   ├── CostosChart.jsx     # Gráfico CAPEX vs OPEX
│   ├── LcoeChart.jsx       # Gráfico de LCOE
│   ├── DisenoTable.jsx     # Tabla de diseño del sistema
│   └── MatrizDecision.jsx  # Gráfico de radar
├── /data
│   └── dashboardData.json  # Datos del dashboard
├── App.jsx                 # Componente principal
├── main.jsx                # Punto de entrada
└── index.css               # Estilos globales
```

## 📊 Datos

Los datos del dashboard se encuentran en `/src/data/dashboardData.json`. Puedes modificar este archivo para actualizar los valores mostrados en el dashboard.

## 🎨 Personalización

### Cambiar colores del tema

Edita el objeto `theme` en `App.jsx`:

```jsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color primario
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
  },
});
```

### Agregar nuevos KPIs

1. Agrega los datos en `dashboardData.json` bajo el objeto `kpis`
2. Agrega un nuevo `KpiCard` en `App.jsx` dentro de la sección de KPIs

### Modificar gráficos

Cada componente de gráfico es independiente y puede ser modificado según tus necesidades. Consulta la documentación de [Recharts](https://recharts.org/) para más opciones de personalización.

## 📝 Licencia

Este proyecto está disponible para uso personal y educativo.
