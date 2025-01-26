import { createClient } from "contentful";

const client = createClient({
  space: 'cmdyls6g26hz',
  accessToken: 'IQSRRgJ1RRYgJsURHbctGxI5yeMI4oApUplYU3n-iR8',
});


export const fetchProducts = async () => {
  try {
    const response = await client.getEntries({content_type: 'product'});
    const products = response.items.map(item => ({
      id: item.sys.id,
      ...item.fields,
    }));
    console.log(products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

