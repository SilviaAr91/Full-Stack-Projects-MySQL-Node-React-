const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const generateExcel = async data => {
  console.log("dataaaa", data);
  try {
    // Crear el libro de trabajo
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "higsa";
    workbook.created = new Date();

    // Crear la hoja
    const worksheet = workbook.addWorksheet("menu", {
      views: [{ state: "frozen", ySplit: 1 }],
      properties: { tabColor: { argb: "FFC000" } },
    });

    // Definir las columnas
    worksheet.columns = [
      { header: "Semana", key: "week", width: 40 },
      { header: "Lunes", key: "monday", width: 40 },
      { header: "Martes", key: "tuesday", width: 40 },
      { header: "Miércoles", key: "wednesday", width: 40 },
      { header: "Jueves", key: "thursday", width: 40 },
      { header: "Viernes", key: "friday", width: 40 },
    ];

    // Estilo de la cabecera
    const headerStyle = {
      font: { bold: true, color: { argb: "FFFFFF" }, size: 25 },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "132234" } },
      alignment: { vertical: "middle", horizontal: "center" },
    };

    // Aplicar el estilo y la altura a la cabecera
    const headerRow = worksheet.getRow(1);
    headerRow.height = 70; // Ajustar la altura de la cabecera
    headerRow.eachCell(cell => Object.assign(cell, headerStyle));

    // Función para formatear el contenido de los platos
    const formatDishes = dishes => {
      if (!dishes) return "";
      const labels = ["Primer plato", "Segundo plato", "Guarnición", "Postre"];
      return dishes
        .map((d, index) => {
          return `• ${labels[index] || "plato"}: ${d.dish_name}`;
        })
        .join("\n");
    };

    // Función para formatear el contenido de los platos
    const formatDishes = (dishes) => {
      if (!dishes) return "";
      const labels = ["Primer plato", "Segundo plato", "Guarnición", "Postre"];
      return dishes
        .map((d, index) => {
          return `• ${labels[index] || "plato"}: ${d.dish_name}`;
        })
        .join("\n");
    };

    // Añadir filas a la hoja
    for (let i = 0; i < data.length; i++) {
      const week = data[i];
      const row = {
        week: `Semana ${week.week}`,
        monday:
          week.days && week.days[0] ? formatDishes(week.days[0].data) : "",
        tuesday:
          week.days && week.days[1] ? formatDishes(week.days[1].data) : "",
        wednesday:
          week.days && week.days[2] ? formatDishes(week.days[2].data) : "",
        thursday:
          week.days && week.days[3] ? formatDishes(week.days[3].data) : "",
        friday:
          week.days && week.days[4] ? formatDishes(week.days[4].data) : "",
      };
      const addedRow = worksheet.addRow(row);

      // Ajustar la altura de las filas a partir de la segunda fila
      addedRow.height = 100;

      // Centrar el contenido horizontal y verticalmente y habilitar la envoltura de texto
      addedRow.eachCell(cell => {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        cell.font = { size: 14 };
      });

      // Aplicar estilos alternos a las filas
      if (i % 2 === 0) {
        addedRow.eachCell(cell => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "efefef" }, // Color de fondo claro para las filas pares
          };
        });
      } else {
        addedRow.eachCell(cell => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "cadef5" }, // Color de fondo claro para las filas impares
          };
        });
      }
    }

    // Añadir estilos específicos para la columna de "Semana"
    worksheet.eachRow((row, rowNumber) => {
      const cell = row.getCell(1);
      if (rowNumber > 1) {
        cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 25 };
        if (rowNumber % 2 === 0) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC000" },
          };
        } else {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "375f90" },
          };
        }
      }
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });

    // Generar un nombre de archivo aleatorio
    const randomFileName = `prueba-${crypto
      .randomBytes(8)
      .toString("hex")}.xlsx`;
    const filePath = path.join(__dirname, "../public/excel", randomFileName);

    // Crear directorios si no existen
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    // Guardar el archivo
    await workbook.xlsx.writeFile(filePath);
    console.log("Archivo de Excel guardado exitosamente:", randomFileName);
  } catch (error) {
    console.error("Error al generar el archivo de Excel:", error);
  }
};

module.exports = { generateExcel };
