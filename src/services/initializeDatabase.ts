import pgp from 'pg-promise';

const connectionString =
  'postgres://postgres:postgrespw@localhost:32768/NotesDB';

const dbContext = pgp({})(connectionString);

export const connectToDB = async () => {
  try {
    await dbContext.connect();
    console.log('DB connected!');
  } catch (error) {
    console.error(error);
  }
};

export default dbContext;
