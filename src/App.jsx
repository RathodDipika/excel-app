import React, { useEffect, useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';

const App = () => {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    // just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const strFile = JSON.stringify(resp);
        localStorage.setItem('file' , strFile);
        console.log(resp , "THIS IS THE DATA")
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  };

  useEffect (()=>{

    const newresp = JSON.parse(localStorage.getItem("file"));
    setCols(newresp.cols);
    setRows(newresp.rows);
  } , [])
  return (
    <div className="p-4">
      <input 
        type="file" 
        onChange={fileHandler} 
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div>
        <h3 className="text-lg font-bold mb-4">Excel Data</h3>
        {rows?.length > 0 && (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {cols.map((col, index) => (
                  <th 
                    key={index} 
                    className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-gray-50">
                  {cols.map((col, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700"
                    >
                      {row[colIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
