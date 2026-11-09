import { Header } from "@/components/Header";
import { EducationRequestForm } from "@/components/EducationRequestForm";
import { Footer } from "@/components/Footer";

export default function EducationRequestPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Header />
      <main className="mx-auto w-full max-w-xl flex-1 px-6 pb-20 pt-[calc(var(--header-height)+2.5rem)]">
        <EducationRequestForm />
      </main>
      <Footer />
    </div>
  );
}
