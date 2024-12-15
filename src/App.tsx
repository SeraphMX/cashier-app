import React, { useState } from 'react';
import { NavigationTab } from './types/navigation';
import { TopNav } from './components/navigation/TopNav';
import { SideMenu } from './components/navigation/SideMenu';
import { BottomNav } from './components/navigation/BottomNav';
import { TotalDisplay } from './components/common/TotalDisplay';
import { useMoney } from './hooks/useMoney';
import { useMemberships } from './hooks/useMemberships';
import { BillCounter } from './components/money/BillCounter';
import { CoinInput } from './components/money/CoinInput';
import { MembershipCounter } from './components/membership/MembershipCounter';
import { VisitCounter } from './components/membership/VisitCounter';
import { ProductSearch } from './components/search/ProductSearch';
import { useProducts } from './hooks/useProducts';
import { SalesGoals } from './components/sales/SalesGoals';
import { ScheduleTable } from './components/schedule/ScheduleTable';
import { CashRegister } from './components/cash/CashRegister';
import { AboutSection } from './components/about/AboutSection';
import { useCashRegister } from './hooks/useCashRegister';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('counter');
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    state: moneyState,
    updateBillCount,
    updateCoins,
    calculateTotal: calculateMoneyTotal,
    resetCounts: resetMoney,
    registerWithdrawal,
  } = useMoney();

  const {
    state: membershipState,
    updateMembershipCount,
    updateVisitCount,
    calculateTotal: calculateMembershipTotal,
    resetCounts: resetMemberships,
  } = useMemberships();

  const {
    query,
    products,
    updateQuery,
    addProduct,
    deleteProduct,
  } = useProducts();

  const { 
    isRegisterClosed,
    hasInitialFund,
  } = useCashRegister();

  const handleMenuItemClick = (key: string) => {
    setActivePage(key);
    setIsMenuOpen(false);
  };

  const getTotal = () => {
    switch (activeTab) {
      case 'counter':
        return calculateMoneyTotal(moneyState);
      case 'memberships':
        return calculateMembershipTotal(membershipState);
      default:
        return 0;
    }
  };

  const handleReset = () => {
    switch (activeTab) {
      case 'counter':
        resetMoney();
        break;
      case 'memberships':
        resetMemberships();
        break;
    }
  };

  const handleWithdraw = () => {
    if (activeTab === 'counter') {
      registerWithdrawal();
    }
  };

  const canShowWithdrawButton = activeTab === 'counter' && !isRegisterClosed && hasInitialFund;

  const renderMainContent = () => {
    if (activePage !== 'home') {
      switch (activePage) {
        case 'sales':
          return <SalesGoals />;
        case 'horario':
          return <ScheduleTable />;
        case 'inventory':
          return <CashRegister />;
        case 'about':
          return <AboutSection />;
        default:
          return null;
      }
    }

    switch (activeTab) {
      case 'counter':
        return (
          <div className="space-y-4">
            {moneyState.bills.map((bill) => (
              <BillCounter
                key={bill.value}
                bill={bill}
                onCountChange={updateBillCount}
              />
            ))}
            <CoinInput
              value={moneyState.coins}
              onChange={updateCoins}
            />
          </div>
        );
      case 'memberships':
        return (
          <div className="space-y-4">
            <VisitCounter
              count={membershipState.visits}
              onCountChange={updateVisitCount}
            />
            {membershipState.memberships.map((membership) => (
              <MembershipCounter
                key={membership.id}
                membership={membership}
                onCountChange={updateMembershipCount}
              />
            ))}
          </div>
        );
      case 'search':
        return (
          <ProductSearch
            query={query}
            products={products}
            onQueryChange={updateQuery}
            onAddProduct={addProduct}
            onDeleteProduct={deleteProduct}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-default-50">
      <header className="fixed top-0 left-0 right-0 z-50">
        <TopNav onMenuClick={() => setIsMenuOpen(true)} />
      </header>

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onItemClick={handleMenuItemClick}
      />

      <div className="pt-16">
        {activePage === 'home' && (activeTab === 'counter' || activeTab === 'memberships') && (
          <div className="sticky top-16 z-40 bg-background/70 backdrop-blur-md border-b border-divider">
            <div className="max-w-2xl mx-auto p-4">
              <TotalDisplay 
                total={getTotal()} 
                onReset={handleReset}
                onWithdraw={canShowWithdrawButton ? handleWithdraw : undefined}
              />
            </div>
          </div>
        )}

        <main className="max-w-2xl mx-auto px-4 pb-20 pt-4">
          {renderMainContent()}
        </main>
      </div>

      {activePage === 'home' && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};

export default App;