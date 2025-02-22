import Particle3D from './modules/particle3D';
import Vortex from './modules/generateData';
import netcdfjs from 'netcdfjs'

const getFileFields = file => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      // 用readAsText读取文件文件内容
      reader.readAsArrayBuffer(file);
      reader.onload = function () {
        var NetCDF = new netcdfjs(reader.result);
        let variables = NetCDF.header.variables.map(item => item.name);
        let dimensions = NetCDF.header.dimensions.map(item => item.name);
        console.log('variables', NetCDF.header.variables);
        console.log('dimensions', dimensions);
        const lonData = NetCDF.getDataVariable('longitude');  
        const latData = NetCDF.getDataVariable('latitude');  
        const varData = NetCDF.getDataVariable('time');
        const t = NetCDF.getDataVariable('t');
        const level = NetCDF.getDataVariable('level');
        const u = NetCDF.getDataVariable('u');
        const v = NetCDF.getDataVariable('v');
        const w = NetCDF.getDataVariable('w');
        // const varArray = latData.map((_, i) =>  
        //   lonData.map((_, j) => varData[i * lonData.length + j])  
        // );  
        console.log('varArray', lonData); 
        console.log('latData', latData); 
        console.log('time', varData);
        console.log('t', t);
        console.log('level', level);
        console.log('u', u);
        console.log('v', v);
        console.log('w', w);
         // 获取维度大小  
         const timeSize = varData.length; // 时间维度大小  
         const levelSize = level.length; // 层次维度大小  
         const latSize = lonData.length; // 纬度维度大小  
         const lonSize = lonData.length; // 经度维度大小 
        // 创建四维数组  
        const fourDArray = new Array(timeSize);  
        for (let t = 0; t < timeSize; t++) {  
            fourDArray[t] = new Array(levelSize);  
            for (let level = 0; level < levelSize; level++) {  
                fourDArray[t][level] = new Array(latSize);  
                for (let lat = 0; lat < latSize; lat++) {  
                    fourDArray[t][level][lat] = new Array(lonSize);  
                }  
            }  
        }  

        // 填充四维数组  
        for (let t = 0; t < timeSize; t++) {  
            for (let level = 0; level < levelSize; level++) {  
                for (let lat = 0; lat < latSize; lat++) {  
                    for (let lon = 0; lon < lonSize; lon++) {  
                        fourDArray[t][level][lat][lon] = varData[t][level][lat][lon];  
                    }  
                }  
            }  
        }  

        resolve({variables, dimensions, raw: NetCDF});
      }
    } catch(e) {
      reject(e);
    }
  })
} 

export { Particle3D, Vortex, getFileFields };