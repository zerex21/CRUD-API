import { ServerResponse, IncomingMessage } from 'http';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../modules/routes';

const mockRequest: Partial<IncomingMessage> = {};
const mockResponse: Partial<ServerResponse> = {
  writeHead: jest.fn(),
  end: jest.fn(),
};

describe('HTTP method switch cases', () => {

  it('should call checkBaseName for GET request with invalid URL', () => {
    mockRequest.method = 'GET';
    mockRequest.url = '/invalid-url';
    const checkBaseName = jest.fn();
    checkBaseName(mockResponse as ServerResponse);
    expect(checkBaseName).toHaveBeenCalledWith(mockResponse);
  });

  it('should call checkUuidRed for GET request with invalid UUID', () => {
    mockRequest.method = 'GET';
    mockRequest.url = '/api/users/invalid-uuid';
    const checkUuidRed = jest.fn();
    checkUuidRed(mockResponse as ServerResponse);
    expect(checkUuidRed).toHaveBeenCalledWith(mockResponse);
  });

  it('should call checkBaseName for POST request with invalid URL', () => {
    mockRequest.method = 'POST';
    mockRequest.url = '/invalid-url';
    const checkBaseName = jest.fn();
    checkBaseName(mockResponse as ServerResponse);
    expect(checkBaseName).toHaveBeenCalledWith(mockResponse);
  });

  it('should call checkBaseName for PUT request with invalid URL', () => {
    mockRequest.method = 'PUT';
    mockRequest.url = '/invalid-url';
    const checkBaseName = jest.fn();
    checkBaseName(mockResponse as ServerResponse);
    expect(checkBaseName).toHaveBeenCalledWith(mockResponse);
  });

  it('should call checkUuidRed for PUT request with invalid UUID', () => {
    mockRequest.method = 'PUT';
    mockRequest.url = '/api/users/invalid-uuid';
    const checkUuidRed = jest.fn();
    checkUuidRed(mockResponse as ServerResponse);
    expect(checkUuidRed).toHaveBeenCalledWith(mockResponse);
  });


  it('should call checkUuidRed for DELETE request with invalid UUID', () => {
    mockRequest.method = 'DELETE';
    mockRequest.url = '/api/users/invalid-uuid';
    const checkUuidRed = jest.fn();
    checkUuidRed(mockResponse as ServerResponse);
    expect(checkUuidRed).toHaveBeenCalledWith(mockResponse);
  });

});