declare global {
  namespace Express {
    interface User {
      name?: string;
      id?: number;
    }
  }
}

export default global;
