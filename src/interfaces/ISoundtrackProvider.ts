export default interface ISoundtrackProvider {
  search(file: string): Promise<{
    [key: string]: any;
  }>;
}
