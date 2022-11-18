import * as bodyParser from 'body-parser';
import * as http from 'http';

export const middlewares = [
  bodyParser.json({
    limit: '50mb',
    verify(req: http.IncomingMessage & { rawBody: any }, res: http.ServerResponse, buf: Buffer, encoding: string) {
      req.rawBody = buf.toString('utf8');
    },
    type: '*/json',
  }),
  bodyParser.raw({
    limit: '50mb',
    verify(req: http.IncomingMessage & { rawBody: any }, res: http.ServerResponse, buf: Buffer, encoding: string) {
      req.rawBody = buf.toString('utf8');
    },
    type: ['*/xml', '*/x-www-form-urlencoded']
  }),
];