// LSB Steganography implementation for PNG images with alpha channel

export async function embedDataInImage(imageFile: File, data: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Cannot get canvas context'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Convert data to binary
        const binaryData = stringToBinary(data);
        
        // Add header with data length
        const headerLength = 32; // 32 bits for length
        const dataLength = binaryData.length;
        const lengthBinary = dataLength.toString(2).padStart(headerLength, '0');
        const fullBinaryData = lengthBinary + binaryData;

        // Check if image has enough capacity
        const maxCapacity = Math.floor(pixels.length / 4) * 4; // 4 bits per pixel (RGBA)
        if (fullBinaryData.length > maxCapacity) {
          reject(new Error('Image too small to embed this amount of data'));
          return;
        }

        // Embed data in LSB of all channels (RGBA)
        for (let i = 0; i < fullBinaryData.length; i++) {
          const pixelIndex = Math.floor(i / 4) * 4;
          const channelIndex = i % 4;
          const bit = parseInt(fullBinaryData[i]);
          
          // Clear LSB and set new bit
          pixels[pixelIndex + channelIndex] = (pixels[pixelIndex + channelIndex] & 0xFE) | bit;
        }

        ctx.putImageData(imageData, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
}

export async function extractDataFromImage(imageFile: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Cannot get canvas context'));
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Extract header (first 32 bits) to get data length
        const headerLength = 32;
        let headerBinary = '';
        
        for (let i = 0; i < headerLength; i++) {
          const pixelIndex = Math.floor(i / 4) * 4;
          const channelIndex = i % 4;
          const bit = pixels[pixelIndex + channelIndex] & 1;
          headerBinary += bit.toString();
        }

        const dataLength = parseInt(headerBinary, 2);
        
        if (dataLength <= 0 || dataLength > pixels.length) {
          resolve(null); // No valid data found
          return;
        }

        // Extract actual data
        let dataBinary = '';
        for (let i = headerLength; i < headerLength + dataLength; i++) {
          const pixelIndex = Math.floor(i / 4) * 4;
          const channelIndex = i % 4;
          const bit = pixels[pixelIndex + channelIndex] & 1;
          dataBinary += bit.toString();
        }

        const extractedData = binaryToString(dataBinary);
        resolve(extractedData);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
}

function stringToBinary(str: string): string {
  return str.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
}

function binaryToString(binary: string): string {
  const chars = [];
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substr(i, 8);
    if (byte.length === 8) {
      chars.push(String.fromCharCode(parseInt(byte, 2)));
    }
  }
  return chars.join('');
}
