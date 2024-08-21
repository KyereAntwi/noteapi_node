import BaseResponse, {
  FilterBase,
  PagedRespones,
} from '../models/BaseResponse';
import Note from '../models/Note';
import dbContext, { PQ } from './initializeDatabase';
import { v4 as uuidv4 } from 'uuid';

export const getAllNotes = async ({ keyword, page, size }: FilterBase) => {
  const response: BaseResponse<PagedRespones<Note>> = {
    statusCode: 200,
    success: true,
    message: 'Success',
  };

  try {
    const offset = (page! - 1) * size!;

    const query = new PQ(
      `SELECT * 
      FROM notes 
      WHERE title ILIKE $1 OR details ILIKE $1
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3`
    );

    query.values = [`%${keyword}%`, size, offset];
    const all = await dbContext.any(query);
    const total: any = await dbContext.one('SELECT COUNT(*) FROM notes');

    response.data = {
      count: parseInt(total.count),
      page: page!,
      size: size!,
      listItems: all,
    };
  } catch (error) {
    response.data = undefined;
    response.message = 'An error occured querying the database';
    response.statusCode = 500;
    response.success = false;
    console.log(error);
  } finally {
    dbContext.$pool.end;
  }

  return response;
};

export const createANote = async (request: Note) => {
  const newNote = new PQ(
    'INSERT INTO notes(id, title, details, created_At) VALUES($1, $2, $3, $4)'
  );

  const id = uuidv4();
  newNote.values = [id, request.title, request.details, new Date()];

  const response: BaseResponse<string> = {
    statusCode: 201,
    success: true,
    message: 'Success',
  };

  try {
    await dbContext.none(newNote);
    response.data = id.toString();
  } catch (error) {
    response.data = undefined;
    response.message = 'An error occured querying the database';
    response.statusCode = 500;
    response.success = false;
    console.log(error);
  } finally {
    dbContext.$pool.end;
  }

  return response;
};
