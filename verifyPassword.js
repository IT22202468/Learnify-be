import bcrypt from 'bcrypt';

const hash = await bcrypt.hash('nimal', 10);

console.log(hash);

const hashedPassword = '$2b$10$XlbbGwWK/5DSLh35Zn0.WujZcdO80GTFZaG6JUmeNuQ7wWXdhrJCS'; 
                        
const plainPassword = 'nimal';

(async () => {
  const isMatch = await bcrypt.compareSync(plainPassword, hashedPassword);
  // const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password match:', isMatch);
})();