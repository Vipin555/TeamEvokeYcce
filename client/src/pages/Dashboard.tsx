import Navigation from "@/components/Navigation";
import StockMetrics from "@/components/StockMetrics";
import StockCard from "@/components/StockCard";
import PortfolioChart from "@/components/PortfolioChart";
import Watchlist from "@/components/Watchlist";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          <StockMetrics />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StockCard 
              symbol="NVDA"
              name="Nvidia"
              price={203.65}
              change={5.63}
            />
            <StockCard 
              symbol="AAPL"
              name="Apple Inc"
              price={145.93}
              change={23.41}
            />
            <StockCard 
              symbol="TSLA"
              name="Tesla Inc"
              price={177.90}
              change={17.63}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PortfolioChart />
            </div>
            <div>
              <Watchlist />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
