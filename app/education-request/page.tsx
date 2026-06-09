import { Header } from "@/components/Header";
import { EducationRequestForm } from "@/components/EducationRequestForm";

export default function EducationRequestPage() {
  return (
    <div className="min-h-dvh bg-surface">
      <Header />
      <main className="mx-auto max-w-xl px-6 pb-20 pt-32">
        <EducationRequestForm />
      </main>
    </div>
  );
}
