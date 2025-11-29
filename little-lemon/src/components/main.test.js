import { initializeTimes, updateTimes } from '../utils/times';

describe('initializeTimes', () => {
  test('calls fetchAPI with today and returns its result', () => {
    const mockTimes = ['17:00', '18:00', '19:00'];

  
    global.fetchAPI = jest.fn(() => mockTimes);

    const result = initializeTimes();

 
    expect(global.fetchAPI).toHaveBeenCalledTimes(1);
    const arg = global.fetchAPI.mock.calls[0][0];
    expect(arg).toBeInstanceOf(Date);
    expect(result).toEqual(mockTimes);
  });
});

describe('updateTimes', () => {
  test('calls fetchAPI with the provided date and returns its result', () => {
    const mockTimes = ['20:00', '21:00'];
    global.fetchAPI = jest.fn(() => mockTimes);

    const action = { type: 'SET_DATE', date: '2025-10-10' };

    const result = updateTimes([], action);

    expect(global.fetchAPI).toHaveBeenCalledTimes(1);

    const arg = global.fetchAPI.mock.calls[0][0];
    expect(arg).toEqual(new Date('2025-10-10'));
    expect(result).toEqual(mockTimes);
  });

  test('returns the same state for unknown action types', () => {
    const initialState = ['17:00'];
    global.fetchAPI = jest.fn(); 

    const result = updateTimes(initialState, { type: 'UNKNOWN' });

    expect(global.fetchAPI).not.toHaveBeenCalled();
    expect(result).toEqual(initialState);
  });
});