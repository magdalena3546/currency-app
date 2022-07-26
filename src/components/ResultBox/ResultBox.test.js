import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ResultBox from "./ResultBox";

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100}/>);
    });
    it ('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: 100, from: 'PLN', to: 'USD' },
            { amount: 200, from: 'PLN', to: 'USD' },
            { amount: 345, from: 'PLN', to: 'USD' },
      ];
      for(const testObj of testCases) {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
        const mainDiv = screen.getByTestId('main-div');
        expect(mainDiv).toHaveTextContent(`PLN ${testObj.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = $${(testObj.amount/3.5).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
        cleanup();
      }
    });
    it ('should render proper info about conversion when USD -> PLN', () => {
      const testCases = [
          { amount: 100, from: 'USD', to: 'PLN' },
          { amount: 200, from: 'USD', to: 'PLN' },
          { amount: 345, from: 'USD', to: 'PLN' },
    ];
    for(const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const mainDiv = screen.getByTestId('main-div');
      expect(mainDiv).toHaveTextContent(`$${testObj.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = PLN ${(testObj.amount * 3.5).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
      cleanup();
    }
  });
  it ('should render proper info about conversion when PLN -> PLN', () => {
    const testCases = [
      { amount: 100, from: 'PLN', to: 'PLN' },
      { amount: 200, from: 'PLN', to: 'PLN' },
      { amount: 3450, from: 'PLN', to: 'PLN' },
    ];
    for(const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const mainDiv = screen.getByTestId('main-div');
      expect(mainDiv).toHaveTextContent(`PLN ${testObj.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = PLN ${testObj.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
      cleanup();
    }
  });

  it ('should render proper info about conversion when USD -> USD', () => {
    const testCases = [
      { amount: 100, from: 'USD', to: 'USD' },
      { amount: 200, from: 'USD', to: 'USD' },
      { amount: 3450, from: 'USD', to: 'USD' },
    ];
    for(const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const mainDiv = screen.getByTestId('main-div');
      expect(mainDiv).toHaveTextContent(`$${testObj.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = $${testObj.amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
      cleanup();
    }
  });
  it('should return "Wrong value" if amount is below 0', () => {
    const testCases = [
      { amount: -100, from: 'USD', to: 'PLN' },
      { amount: -200, from: 'PLN', to: 'USD' },
      { amount: -3450, from: 'USD', to: 'PLN' },
    ];
    for(const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const mainDiv = screen.getByTestId('main-div');
      expect(mainDiv).toHaveTextContent("Wrong value...");
      cleanup();
    }
  });
});