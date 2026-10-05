import FinancialCard from './components/financialCards'
import RecentTransactions from './components/recentTransactions'

function Financial() {

    return (
        <>
            <div className="w-full flex flex-col gap-4  px-5 p-2 items-center justify-center">

                <FinancialCard />
                <RecentTransactions />

            </div>
        </>
    )
}

export default Financial
