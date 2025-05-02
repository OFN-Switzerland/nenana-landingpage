import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the JSON file
const storeDataPath = path.join(__dirname, '../public/store-location-data.json');

// Function to make a geocoding request with a delay to respect Nominatim's usage policy
function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    // Build address query string
    const addressParts = [];
    if (address.street) addressParts.push(address.street);
    if (address.city) addressParts.push(address.city);
    if (address.state) addressParts.push(address.state);
    if (address.zip) addressParts.push(address.zip);
    if (address.country) addressParts.push(address.country);
    
    const query = encodeURIComponent(addressParts.join(', '));
    
    // Skip if we don't have enough information
    if (addressParts.length < 2) {
      console.log('Skipping address with insufficient information:', address);
      resolve(null);
      return;
    }
    
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    
    // Add a 1-second delay to respect Nominatim's usage policy
    setTimeout(() => {
      const req = https.get(url, {
        headers: {
          'User-Agent': 'NeNaNa-Landingpage/1.0'
        }
      }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result && result.length > 0) {
              const { lat, lon } = result[0];
              console.log(`Geocoded: ${addressParts.join(', ')} -> ${lat}, ${lon}`);
              resolve({
                latitude: parseFloat(lat),
                longitude: parseFloat(lon)
              });
            } else {
              console.warn(`No results for: ${addressParts.join(', ')}`);
              resolve(null);
            }
          } catch (error) {
            console.error('Error parsing response:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('Error making request:', error);
        reject(error);
      });
      
      req.end();
    }, 1000); // 1-second delay
  });
}

async function updateStoreCoordinates() {
  try {
    // Read the JSON file
    const data = JSON.parse(fs.readFileSync(storeDataPath, 'utf8'));
    
    // Process each store
    for (const store of data.stores) {
      console.log(`Processing store: ${store.name}`);
      
      const position = await geocodeAddress(store.address);
      
      // Update the position if geocoding was successful
      if (position) {
        store.address.position = position;
      } else {
        // If geocoding failed, try with just city and country as fallback
        console.log(`Retrying with simplified address for: ${store.name}`);
        const simplifiedAddress = {
          city: store.address.city,
          country: store.address.country
        };
        
        const fallbackPosition = await geocodeAddress(simplifiedAddress);
        if (fallbackPosition) {
          store.address.position = fallbackPosition;
        }
      }
    }
    
    // Write the updated data back to the file
    fs.writeFileSync(storeDataPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully updated store coordinates');
    
  } catch (error) {
    console.error('Error updating coordinates:', error);
  }
}

// Run the script
updateStoreCoordinates();
