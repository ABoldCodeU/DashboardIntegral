import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardIntegral = () => {
  const [seccionActiva, setSeccionActiva] = useState('resumen');
  const [tipoReporte, setTipoReporte] = useState('beneficiarios');
  const [periodoReporte, setPeriodoReporte] = useState('mensual');
  const [reporteGenerado, setReporteGenerado] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  // Datos para resumen de avances
  const metasData = [
    { objetivo: 'Digitalización', metaOriginal: '30%', logrado: '15%', cumplimiento: 50 },
    { objetivo: 'Capacitación', metaOriginal: '80%', logrado: '80%', cumplimiento: 100 },
    { objetivo: 'Tiempos', metaOriginal: '-20%', logrado: '-25%', cumplimiento: 125 },
    { objetivo: 'Sistema Seguimiento', metaOriginal: '50%', logrado: '30%', cumplimiento: 60 }
  ];
  
  // Datos para expedientes digitalizados
  const programasData = [
    { programa: 'Láminas/Tinacos', digitalizados: 87, total: 156, porcentaje: 56 },
    { programa: 'Becas Educativas', digitalizados: 120, total: 185, porcentaje: 65 },
    { programa: 'Despensas', digitalizados: 145, total: 382, porcentaje: 38 },
    { programa: 'Vivienda', digitalizados: 42, total: 76, porcentaje: 55 },
    { programa: 'Adultos Mayores', digitalizados: 65, total: 98, porcentaje: 66 }
  ];
  
  // Datos para tiempos de respuesta
  const tiemposData = [
    { mes: 'Sept', antes: 14, despues: 14 },
    { mes: 'Oct', antes: 14, despues: 13 },
    { mes: 'Nov', antes: 14, despues: 11 },
    { mes: 'Dic', antes: 14, despues: 10.5 }
  ];
  
  // Datos para competencias digitales
  const competenciasData = [
    { nivel: 'Principiante (N1)', antes: 40, despues: 10 },
    { nivel: 'Básico (N2)', antes: 35, despues: 25 },
    { nivel: 'Intermedio (N3)', antes: 20, despues: 45 },
    { nivel: 'Avanzado (N4)', antes: 5, despues: 20 }
  ];
  
  // Datos para programas por estado
  const estadosSolicitudesData = [
    { name: 'Pendientes', value: 45, color: '#ff8042' },
    { name: 'En Proceso', value: 65, color: '#FFBB28' },
    { name: 'Aprobados', value: 38, color: '#00C49F' },
    { name: 'Entregados', value: 95, color: '#0088FE' }
  ];
  
  // Datos para registro de beneficiarios
  const beneficiariosData = [
    { name: 'Becas', value: 120, color: '#36A2EB' },
    { name: 'Láminas', value: 80, color: '#FF6384' },
    { name: 'Despensas', value: 150, color: '#FFCE56' },
    { name: 'Vivienda', value: 60, color: '#4BC0C0' },
    { name: 'Adultos Mayores', value: 95, color: '#9966FF' }
  ];
  
  // Datos de capacitación por mes
  const capacitacionMensualData = [
    { name: 'Sept', capacitados: 4, total: 10 },
    { name: 'Oct', capacitados: 6, total: 10 },
    { name: 'Nov', capacitados: 8, total: 10 },
    { name: 'Dic', capacitados: 8, total: 10 }
  ];
  
  // Datos para reportes
  const beneficiarios = [
    { folio: 'BEC-001', nombre: "María López", programa: "Becas", fecha: "2023-05-01", estatus: "Entregado" },
    { folio: 'LAM-021', nombre: "Juan Pérez", programa: "Láminas", fecha: "2023-06-10", estatus: "En proceso" },
    { folio: 'DES-045', nombre: "Ana Torres", programa: "Despensas", fecha: "2023-06-15", estatus: "Entregado" },
    { folio: 'VIV-012', nombre: "Carlos Díaz", programa: "Vivienda", fecha: "2023-07-01", estatus: "Aprobado" },
    { folio: 'BEC-010', nombre: "Roberto Méndez", programa: "Becas", fecha: "2023-07-15", estatus: "Entregado" },
    { folio: 'ADM-031', nombre: "Laura Sánchez", programa: "Adultos Mayores", fecha: "2023-08-05", estatus: "Entregado" },
    { folio: 'BEC-015', nombre: "Sofía Ramírez", programa: "Becas", fecha: "2023-08-10", estatus: "En proceso" },
    { folio: 'LAM-030', nombre: "Miguel Ángel Castro", programa: "Láminas", fecha: "2023-09-01", estatus: "Aprobado" }
  ];
  
  // Calcular totales
  const totalDigitalizados = programasData.reduce((sum, program) => sum + program.digitalizados, 0);
  const totalExpedientes = programasData.reduce((sum, program) => sum + program.total, 0);
  const porcentajeTotal = ((totalDigitalizados / totalExpedientes) * 100).toFixed(1);
  
  // Navegación de secciones
  const secciones = [
    { id: 'resumen', nombre: 'Resumen General' },
    { id: 'expedientes', nombre: 'Expedientes Digitalizados' },
    { id: 'tiempos', nombre: 'Tiempos de Respuesta' },
    { id: 'competencias', nombre: 'Competencias Digitales' },
    { id: 'reportes', nombre: 'Generador de Reportes' }
  ];
  
  // Función para generar reporte
  const generarReporte = () => {
    setCargando(true);
    // Simulamos un tiempo de generación del reporte
    setTimeout(() => {
      setCargando(false);
      setReporteGenerado(true);
    }, 1500);
  };
  
  // Función para reiniciar
  const reiniciarReporte = () => {
    setReporteGenerado(false);
  };
  
  // Función para simplificar el porcentaje
  const formatoPorcentaje = (porcentaje) => {
    if (porcentaje > 100) return 100;
    return Math.round(porcentaje);
  };
  
  // Función para formatear fechas
  const obtenerFecha = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString();
  };
  
  return (
    <div className="container mx-auto p-4 max-w-7xl bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        {/* Header con logos */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4 border-blue-100">
          <div className="flex items-center space-x-4">
            <img 
              src="https://github.com/ABoldCodeU/imagenes-para-proyectos/blob/main/imagenes/tlal_gob.png?raw=true" 
              alt="Gobierno Tlalpujahua" 
              className="h-16 md:h-20 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Dashboard de Modernización Administrativa</h1>
              <p className="text-gray-600">Área de Desarrollo Social - Tlalpujahua, Michoacán</p>
            </div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <img 
              src="https://github.com/ABoldCodeU/imagenes-para-proyectos/blob/main/imagenes/tlal.png?raw=true" 
              alt="Tlalpujahua Pueblo Mágico" 
              className="h-16 md:h-20 object-contain"
            />
            <div className="ml-4 bg-blue-50 p-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500 mr-2">Fecha:</span>
              <span className="text-sm font-medium">{obtenerFecha()}</span>
            </div>
          </div>
        </div>
        
        {/* Navegación de pestañas */}
        <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
          {secciones.map(seccion => (
            <button
              key={seccion.id}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                seccionActiva === seccion.id 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setSeccionActiva(seccion.id)}
            >
              {seccion.nombre}
            </button>
          ))}
        </div>
        
        {/* Contenido de las secciones */}
        {seccionActiva === 'resumen' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm transition-all hover:shadow-md hover:bg-blue-100 duration-300">
                <p className="text-xs text-blue-600 mb-1">Expedientes</p>
                <p className="text-xl md:text-2xl font-bold text-blue-700">{porcentajeTotal}%</p>
                <p className="text-xs text-blue-600">Digitalizados</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm transition-all hover:shadow-md hover:bg-green-100 duration-300">
                <p className="text-xs text-green-600 mb-1">Personal</p>
                <p className="text-xl md:text-2xl font-bold text-green-700">80%</p>
                <p className="text-xs text-green-600">Capacitado</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm transition-all hover:shadow-md hover:bg-purple-100 duration-300">
                <p className="text-xs text-purple-600 mb-1">Tiempos</p>
                <p className="text-xl md:text-2xl font-bold text-purple-700">-25%</p>
                <p className="text-xs text-purple-600">Reducción</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-sm transition-all hover:shadow-md hover:bg-yellow-100 duration-300">
                <p className="text-xs text-yellow-600 mb-1">Programas</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-700">30%</p>
                <p className="text-xs text-yellow-600">Con seguimiento</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Metas vs. Avances</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-gray-100">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Objetivo</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">Meta</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">Logrado</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 uppercase">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {metasData.map((meta, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{meta.objetivo}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-500">{meta.metaOriginal}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-500">{meta.logrado}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                meta.cumplimiento >= 90 ? 'bg-green-100 text-green-800' :
                                meta.cumplimiento >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {formatoPorcentaje(meta.cumplimiento)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Distribución por Programa</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={beneficiariosData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {beneficiariosData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} beneficiarios`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Evolución de Tiempos de Respuesta</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={tiemposData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis label={{ value: 'Días', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} días`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="antes" name="Antes" stroke="#8884d8" />
                      <Line type="monotone" dataKey="despues" name="Después" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Estado de Solicitudes</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={estadosSolicitudesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {estadosSolicitudesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} solicitudes`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {seccionActiva === 'expedientes' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-blue-600 mb-1">Total Expedientes</p>
                <p className="text-3xl font-bold text-blue-700">{totalExpedientes}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-green-600 mb-1">Digitalizados</p>
                <p className="text-3xl font-bold text-green-700">{totalDigitalizados}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-purple-600 mb-1">Avance Global</p>
                <p className="text-3xl font-bold text-purple-700">{porcentajeTotal}%</p>
              </div>
            </div>
            
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Progreso por Programa</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-gray-100">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Programa</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Digitalizados</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Porcentaje</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Progreso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {programasData.map((programa, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{programa.programa}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900 font-medium">
                          {programa.digitalizados}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                          {programa.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            programa.porcentaje > 75 ? 'bg-green-100 text-green-800' :
                            programa.porcentaje > 50 ? 'bg-blue-100 text-blue-800' :
                            programa.porcentaje > 25 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {programa.porcentaje}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                programa.porcentaje > 75 ? 'bg-green-600' :
                                programa.porcentaje > 50 ? 'bg-blue-600' :
                                programa.porcentaje > 25 ? 'bg-yellow-500' :
                                'bg-red-600'
                              }`} 
                              style={{ width: `${programa.porcentaje}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-700 mb-2 border-l-4 border-green-500 pl-2">Observaciones:</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  <li>El programa de <strong>Adultos Mayores</strong> muestra el mayor avance proporcional (66%).</li>
                  <li>La digitalización de <strong>Despensas</strong> muestra un avance más lento debido al alto volumen de expedientes.</li>
                  <li>El ritmo promedio de digitalización es de 115 expedientes por mes.</li>
                  <li>La priorización se realiza según la frecuencia de consulta de cada tipo de expediente.</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-blue-700 mb-2 border-l-4 border-blue-500 pl-2">Próximos pasos:</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  <li><strong>Enero 2024:</strong> Digitalización de expedientes del programa Despensas.</li>
                  <li><strong>Febrero 2024:</strong> Implementación de sistema de búsqueda avanzada.</li>
                  <li><strong>Marzo 2024:</strong> Integración con sistema de seguimiento de solicitudes.</li>
                  <li><strong>Meta estimada:</strong> 40% de digitalización total para marzo 2024.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {seccionActiva === 'tiempos' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-md transform transition hover:scale-105 duration-300">
                <p className="text-sm text-blue-600 mb-1">Tiempo Inicial</p>
                <p className="text-3xl font-bold text-blue-700">14 días</p>
                <p className="text-xs text-blue-500">Promedio antes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-md transform transition hover:scale-105 duration-300">
                <p className="text-sm text-green-600 mb-1">Tiempo Actual</p>
                <p className="text-3xl font-bold text-green-700">10.5 días</p>
                <p className="text-xs text-green-500">Promedio después</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-center shadow-md transform transition hover:scale-105 duration-300">
                <p className="text-sm text-purple-600 mb-1">Reducción</p>
                <p className="text-3xl font-bold text-purple-700">25%</p>
                <p className="text-xs text-purple-500">Mejora en tiempo</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Evolución de Tiempos de Respuesta</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={tiemposData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis label={{ value: 'Días', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} días`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="antes" name="Antes de digitalización" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                      <Line type="monotone" dataKey="despues" name="Después de digitalización" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Mejora por Tipo de Actividad</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { nombre: 'Búsqueda de expedientes', antes: 45, despues: 15, mejora: 66.7 },
                        { nombre: 'Generación de reportes', antes: 120, despues: 25, mejora: 79.2 },
                        { nombre: 'Registro de beneficiarios', antes: 30, despues: 15, mejora: 50.0 },
                        { nombre: 'Actualización de estatus', antes: 20, despues: 5, mejora: 75.0 },
                        { nombre: 'Respuesta a consultas', antes: 15, despues: 5, mejora: 66.7 }
                      ]}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" label={{ value: 'Minutos', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="nombre" type="category" />
                      <Tooltip formatter={(value) => `${value} minutos`} />
                      <Legend />
                      <Bar dataKey="antes" name="Antes" fill="#8884d8" />
                      <Bar dataKey="despues" name="Después" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Factores de Mejora:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-medium text-gray-800 mb-1">Digitalización de Expedientes</h4>
                  <p className="text-sm text-gray-600">La organización digital permite localizar información en segundos, eliminando búsquedas físicas que tomaban hasta 45 minutos.</p>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-medium text-gray-800 mb-1">Sistema de Seguimiento</h4>
                  <p className="text-sm text-gray-600">La implementación del seguimiento en Excel permite identificar cuellos de botella y asignar prioridades automáticamente.</p>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-medium text-gray-800 mb-1">Capacitación del Personal</h4>
                  <p className="text-sm text-gray-600">La capacitación permitió reducir errores en la captura de datos y aumentar la autonomía en la resolución de problemas.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {seccionActiva === 'competencias' && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Nivel de Competencias Digitales</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={competenciasData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nivel" />
                      <YAxis label={{ value: '% Personal', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Bar dataKey="antes" name="Antes de capacitación" fill="#8884d8" />
                      <Bar dataKey="despues" name="Después de capacitación" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Avance de Capacitación</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={capacitacionMensualData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} empleados`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="capacitados" name="Personal capacitado" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="total" name="Total personal" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Habilidades Desarrolladas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-medium text-blue-700 mb-2">Nivel Básico</h4>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Manejo del equipo (encendido, apagado, periféricos)</li>
                    <li>Gestión básica de archivos y carpetas</li>
                    <li>Uso de procesador de texto simple</li>
                    <li>Navegación en internet</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-medium text-green-700 mb-2">Nivel Intermedio</h4>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Hojas de cálculo con fórmulas básicas</li>
                    <li>Digitalización de documentos</li>
                    <li>Búsquedas avanzadas en bases de datos</li>
                    <li>Correo electrónico con archivos adjuntos</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h4 className="font-medium text-purple-700 mb-2">Nivel Avanzado</h4>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Manejo de fórmulas complejas en Excel</li>
                    <li>Generación de reportes automáticos</li>
                    <li>Tablas dinámicas para análisis de datos</li>
                    <li>Mentorías a otros miembros del equipo</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Metodología de Capacitación:</h3>
              <ul className="list-disc pl-5 text-gray-600 text-sm">
                <li><strong>Microcapacitaciones:</strong> Sesiones cortas (30-45 minutos) enfocadas en necesidades específicas.</li>
                <li><strong>Material adaptado:</strong> Manuales simplificados con capturas de pantalla y lenguaje accesible.</li>
                <li><strong>Enfoque práctico:</strong> Uso de casos reales y ejercicios directamente relacionados con tareas diarias.</li>
                <li><strong>Mentores internos:</strong> Personal con mayor conocimiento apoya a compañeros en dudas cotidianas.</li>
                <li><strong>Evaluación continua:</strong> Seguimiento mensual para detectar áreas de refuerzo.</li>
              </ul>
            </div>
          </div>
        )}
        
        {seccionActiva === 'reportes' && (
          <div className="animate-fadeIn">
            {!reporteGenerado ? (
              <div>
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4 border-l-4 border-blue-500 pl-2">Generador de Reportes PDF</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Tipo de Reporte:</label>
                        <div className="grid grid-cols-1 gap-3">
                          <div 
                            className={`border rounded-md p-3 cursor-pointer transition-all duration-200 ${tipoReporte === 'beneficiarios' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}`}
                            onClick={() => setTipoReporte('beneficiarios')}
                          >
                            <div className="font-medium mb-1">Lista de Beneficiarios</div>
                            <div className="text-sm text-gray-600">Reporte detallado de beneficiarios por programa</div>
                          </div>
                          <div 
                            className={`border rounded-md p-3 cursor-pointer transition-all duration-200 ${tipoReporte === 'estadisticas' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}`}
                            onClick={() => setTipoReporte('estadisticas')}
                          >
                            <div className="font-medium mb-1">Estadísticas por Programa</div>
                            <div className="text-sm text-gray-600">Resumen estadístico de apoyos entregados</div>
                          </div>
                          <div 
                            className={`border rounded-md p-3 cursor-pointer transition-all duration-200 ${tipoReporte === 'pendientes' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}`}
                            onClick={() => setTipoReporte('pendientes')}
                          >
                            <div className="font-medium mb-1">Solicitudes Pendientes</div>
                            <div className="text-sm text-gray-600">Listado de solicitudes en proceso</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Periodo:</label>
                        <select 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition-all duration-200"
                          value={periodoReporte}
                          onChange={(e) => setPeriodoReporte(e.target.value)}
                        >
                          <option value="semanal">Semanal</option>
                          <option value="mensual">Mensual</option>
                          <option value="trimestral">Trimestral</option>
                          <option value="anual">Anual</option>
                        </select>
                      </div>
                      
                      <button 
                        onClick={generarReporte}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Generar Reporte
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Vista previa del contenido:</h4>
                      
                      {tipoReporte === 'beneficiarios' && (
                        <div className="bg-white p-3 border border-gray-300 rounded-md shadow-sm">
                          <p className="text-sm text-gray-600 mb-2">El reporte incluirá:</p>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Lista completa de beneficiarios</li>
                            <li>Clasificación por programa</li>
                            <li>Fechas de solicitud y entrega</li>
                            <li>Estado actual de cada solicitud</li>
                            <li>Estadísticas generales</li>
                          </ul>
                        </div>
                      )}
                      
                      {tipoReporte === 'estadisticas' && (
                        <div className="bg-white p-3 border border-gray-300 rounded-md shadow-sm">
                          <p className="text-sm text-gray-600 mb-2">El reporte incluirá:</p>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Total de beneficiarios por programa</li>
                            <li>Comparación con periodos anteriores</li>
                            <li>Porcentaje de apoyos entregados vs. pendientes</li>
                            <li>Distribución geográfica (por localidad)</li>
                            <li>Gráficas comparativas</li>
                          </ul>
                        </div>
                      )}
                      
                      {tipoReporte === 'pendientes' && (
                        <div className="bg-white p-3 border border-gray-300 rounded-md shadow-sm">
                          <p className="text-sm text-gray-600 mb-2">El reporte incluirá:</p>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Solicitudes en proceso o pendientes</li>
                            <li>Tiempo en estado actual</li>
                            <li>Solicitudes con documentación incompleta</li>
                            <li>Casos críticos o prioritarios</li>
                            <li>Acciones recomendadas</li>
                          </ul>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Mejoras implementadas:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          <li><strong>Generación automática:</strong> Reducción de 2 horas a 25 minutos</li>
                          <li><strong>Formatos estandarizados:</strong> Coherencia visual y profesional</li>
                          <li><strong>Tablas dinámicas:</strong> Análisis avanzado de datos</li>
                          <li><strong>Exportación flexible:</strong> PDF, Excel o documentos compartidos</li>
                          <li><strong>Sistema programable:</strong> Reportes automáticos periódicos</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Ejemplos de Reportes</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                        <h4 className="font-medium text-gray-700 mb-2">Reporte Semanal</h4>
                        <p className="text-sm text-gray-600">Resumen ejecutivo con indicadores clave:</p>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                          <li>Nuevas solicitudes: <strong>32</strong></li>
                          <li>Expedientes procesados: <strong>45</strong></li>
                          <li>Apoyos entregados: <strong>28</strong></li>
                          <li>Tiempo promedio de respuesta: <strong>10.5 días</strong></li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                        <h4 className="font-medium text-gray-700 mb-2">Reporte Mensual</h4>
                        <p className="text-sm text-gray-600">Visión completa del periodo:</p>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                          <li>Análisis comparativo con meses anteriores</li>
                          <li>Desglose por localidades y tipo de apoyo</li>
                          <li>Proyección de recursos necesarios</li>
                          <li>Identificación de tendencias y patrones</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 border-l-4 border-blue-500 pl-2">Flujo de Generación de Reportes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 mt-0.5">1</div>
                          <div>
                            <p className="font-medium text-gray-700">Seleccionar tipo de reporte</p>
                            <p className="text-sm text-gray-600">El usuario elige qué información necesita visualizar (beneficiarios, estadísticas, pendientes)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 mt-0.5">2</div>
                          <div>
                            <p className="font-medium text-gray-700">Definir periodo y filtros</p>
                            <p className="text-sm text-gray-600">Se establece el rango de fechas y se pueden aplicar filtros adicionales (programa, localidad)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 mt-0.5">3</div>
                          <div>
                            <p className="font-medium text-gray-700">Procesamiento automático</p>
                            <p className="text-sm text-gray-600">El sistema consulta la base de datos, aplica cálculos estadísticos y prepara la presentación</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold mr-2 mt-0.5">4</div>
                          <div>
                            <p className="font-medium text-gray-700">Generación y distribución</p>
                            <p className="text-sm text-gray-600">El reporte se exporta en PDF o Excel y puede compartirse digitalmente o imprimirse</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-green-50 p-4 rounded-md flex items-center mb-6 shadow-md">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-green-700">¡Reporte generado exitosamente!</span>
                </div>
                
                <div className="border border-gray-300 rounded-md p-4 mb-6 shadow-md bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-blue-700">
                      {tipoReporte === 'beneficiarios' && 'Reporte de Beneficiarios'}
                      {tipoReporte === 'estadisticas' && 'Estadísticas por Programa'}
                      {tipoReporte === 'pendientes' && 'Solicitudes Pendientes'}
                    </h2>
                    <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      Periodo: {periodoReporte.charAt(0).toUpperCase() + periodoReporte.slice(1)}
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-300 mb-4"></div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Área de Desarrollo Social - Tlalpujahua, Michoacán</h3>
                    <p className="text-sm text-gray-600">Fecha de generación: {new Date().toLocaleDateString()}</p>
                  </div>
                  
                  {tipoReporte === 'beneficiarios' && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-50 to-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programa</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {beneficiarios.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.folio}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nombre}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.programa}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fecha}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                                  item.estatus === 'Entregado' ? 'bg-green-100 text-green-800' :
                                  item.estatus === 'En proceso' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {item.estatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {tipoReporte === 'estadisticas' && (
                    <div>
                      <h4 className="font-medium mb-2 border-l-4 border-blue-500 pl-2">Resumen Estadístico:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150">
                              <span>Total de beneficiarios:</span>
                              <span className="font-bold">{beneficiarios.length}</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150">
                              <span>Becas:</span>
                              <span className="font-bold">{beneficiarios.filter(b => b.programa === 'Becas').length}</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150">
                              <span>Láminas:</span>
                              <span className="font-bold">{beneficiarios.filter(b => b.programa === 'Láminas').length}</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150">
                              <span>Despensas:</span>
                              <span className="font-bold">{beneficiarios.filter(b => b.programa === 'Despensas').length}</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150">
                              <span>Vivienda:</span>
                              <span className="font-bold">{beneficiarios.filter(b => b.programa === 'Vivienda').length}</span>
                            </li>
                            <li className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150">
                              <span>Adultos Mayores:</span>
                              <span className="font-bold">{beneficiarios.filter(b => b.programa === 'Adultos Mayores').length}</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 border-l-4 border-blue-500 pl-2">Distribución de Programas:</h4>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={beneficiariosData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={60}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {beneficiariosData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 border-l-4 border-blue-500 pl-2">Porcentaje de Apoyos Entregados:</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div className="bg-blue-600 h-4 rounded-full transition-all duration-1000" style={{ width: '62.5%' }}></div>
                        </div>
                        <div className="text-right mt-1 text-sm text-gray-600">5/8 (62.5%)</div>
                      </div>
                    </div>
                  )}
                  
                  {tipoReporte === 'pendientes' && (
                    <div>
                      <h4 className="font-medium mb-2 border-l-4 border-blue-500 pl-2">Solicitudes en proceso o pendientes:</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
                          <thead className="bg-gradient-to-r from-blue-50 to-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folio</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programa</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {beneficiarios
                              .filter(b => b.estatus !== 'Entregado')
                              .map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.folio}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nombre}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.programa}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fecha}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                                      item.estatus === 'En proceso' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {item.estatus}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                        <h4 className="font-medium text-yellow-800 mb-1">Acciones recomendadas:</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          <li>Dar seguimiento prioritario a expedientes con más de 10 días en estatus "En proceso"</li>
                          <li>Verificar documentación faltante para casos "Aprobados" pendientes de entrega</li>
                          <li>Programar visitas de validación para solicitudes de Vivienda</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-300 mt-6 pt-4">
                    <p className="text-sm text-gray-600">Este reporte fue generado automáticamente por el Sistema de Digitalización del Área de Desarrollo Social.</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    onClick={reiniciarReporte}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none transition-all duration-300 hover:shadow"
                  >
                    Generar otro reporte
                  </button>
                  
                  <button 
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Descargar PDF
                  </button>
                </div>
              </div>
            )}
            
            {cargando && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-700">Generando reporte, por favor espere...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center space-x-4 mb-2">
          <img 
            src="https://github.com/ABoldCodeU/imagenes-para-proyectos/blob/main/imagenes/tlal_gob.png?raw=true" 
            alt="Gobierno Tlalpujahua" 
            className="h-10 object-contain"
          />
          <img 
            src="https://github.com/ABoldCodeU/imagenes-para-proyectos/blob/main/imagenes/tlal.png?raw=true" 
            alt="Tlalpujahua Pueblo Mágico" 
            className="h-10 object-contain"
          />
        </div>
        <p>Estadía Profesional - Tlalpujahua, Michoacán</p>
        <p className="font-semibold">Dashboard desarrollado como evidencia del Proyecto de Modernización Administrativa</p>
        <p className="mt-2">Desarrollado por <span className="font-semibold text-blue-600">Alfonso Boldo</span></p>
      </div>
    </div>
  );
};

export default DashboardIntegral;