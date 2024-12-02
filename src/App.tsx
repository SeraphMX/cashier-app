import React from 'react';
import { Navbar, NavbarBrand } from '@nextui-org/react';
import { BillCounter } from './components/BillCounter';
import { CoinInput } from './components/CoinInput';
import { TotalDisplay } from './components/TotalDisplay';
import { useMoney } from './hooks/useMoney';
import { Wallet } from 'lucide-react';

function App() {
  const { state, updateBillCount, updateCoins, calculateTotal, resetCounts } = useMoney();
  const total = calculateTotal(state);

  return (
    <div className="min-h-screen bg-default-50">
      <Navbar isBordered className="fixed top-0 z-50">
        <NavbarBrand className="flex justify-center w-full gap-2">
          <Wallet className="w-8 h-8 text-primary" />
          <p className="text-2xl font-bold">Contador de Dinero</p>
        </NavbarBrand>
      </Navbar>

      <main className="max-w-2xl mx-auto pt-24 px-4 pb-32">
        <div className="space-y-4 mb-4">
          {state.bills.map((bill) => (
            <BillCounter
              key={bill.value}
              bill={bill}
              onCountChange={updateBillCount}
            />
          ))}
        </div>

        <CoinInput value={state.coins} onChange={updateCoins} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-t border-divider">
        <div className="max-w-2xl mx-auto p-4">
          <TotalDisplay total={total} onReset={resetCounts} />
        </div>
      </div>
    </div>
  );
}

export default App;