"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import IconArrowRight from "@/components/icons/IconArrowRight";
import Image from 'next/image';

const AccountSetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    newsletter: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target as HTMLInputElement & HTMLSelectElement;
      setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateStep = (step: number) => {
    let isValid = true;
    if (step === 1) {
      ['email', 'password'].forEach(field => {
        if (!formData[field as keyof typeof formData]) isValid = false;
      });
    } else if (step === 2) {
      ['username'].forEach(field => {
        if (!formData[field as keyof typeof formData]) isValid = false;
      });
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
    }
  };

  const slides = [
    "Face shape",
    "Eyes",
    "Nose",
    "Mouth",
    "Hair",
    "Clothes",
  ];

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [index, setIndex] = useState(0);

  const goToSlide = (i: number) => {
    setIndex(i);
    slideRefs.current[i]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
    });
  };

  const prev = () => {
    if (index > 0) goToSlide(index - 1);
  };

  const next = () => {
    if (index < slides.length - 1) goToSlide(index + 1);
  };

  return (
    <div className="">
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-[var(--color-text)]">Create account</h1>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                {['Personal Info', 'Account Details', 'Avatar'].map((label, index) => {
                    const step = index + 1;
                    return (
                    <span
                        key={step}
                        className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[var(--color-primary)] bg-[var(--color-highlight)] ${
                        currentStep < step ? 'opacity-50' : ''
                        }`}
                    >
                        {label}
                    </span>
                    );
                })}
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[var(--color-highlight)]">
                <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[var(--color-primary)] transition-all duration-500 ease-in-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1 */}
                {currentStep === 1 && (
                <div className="step">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600"
                        required
                    />
                    </div>
                    <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600"
                        required
                    />
                    </div>
                </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                <div className="step">
                    <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600"
                    />
                    </div>
                </div>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                <div className="step">
                    <div className="flex items-center mb-6">
                        
                    
                        <div className="relative w-full max-w-5xl mx-auto">

                            {/* LEFT ARROW */}
                            <button
                                type="button"
                                onClick={prev}
                                disabled={index === 0}
                                className="btn btn-circle absolute left-0 top-1/2 -translate-y-1/2 z-10"
                            >
                                ❮
                            </button>

                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                                    <Image
                                        src="https://i.pinimg.com/736x/a2/7c/68/a27c68c96b585971497bbb45b7f1b257.jpg"
                                        alt="Avatar"
                                        width={200}
                                        height={100}
                                    />
                                </div>
                            </div>

                            <div className="carousel carousel-center w-full p-4 gap-4 bg-base-200 rounded-box overflow-x-auto snap-x snap-mandatory">

                                {/* LEFT SPACER */}
                                <div className="w-1/2 flex-shrink-0 pointer-events-none" />

                                {slides.map((text: string, i: number) => (
                                    <div
                                    key={i}
                                    ref={(el: HTMLDivElement | null) => {
                                        slideRefs.current[i] = el;
                                    }}
                                    className="carousel-item snap-center w-64 flex-shrink-0"
                                    >
                                    <div className="w-full h-32 flex items-center justify-center">
                                        <div
                                        className={`w-full h-full rounded-xl shadow text-lg font-semibold flex items-center justify-center transition-transform duration-300 ${
                                            i === index
                                            ? "bg-primary text-primary-content scale-105"
                                            : "bg-base-100"
                                        }`}
                                        >
                                        {text}
                                        </div>
                                    </div>
                                    </div>
                                ))}

                                {/* RIGHT SPACER */}
                                <div className="w-1/2 flex-shrink-0 pointer-events-none" />

                            </div>

                            {/* RIGHT ARROW */}
                            <button
                                type="button"
                                onClick={next}
                                disabled={index === slides.length - 1}
                                className="btn btn-circle absolute right-0 top-1/2 -translate-y-1/2 z-10"
                            >
                                ❯
                            </button>

                            {/* PAGINATION DOTS */}
                            <div className="flex justify-center gap-2 mt-4">
                                {slides.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => goToSlide(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                    i === index ? "bg-primary scale-125" : "bg-gray-400"
                                    }`}
                                />
                                ))}
                            </div>

                        </div>



                    </div>
                </div>
                )}

                {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className={`bg-[var(--color-secondary-contrast)] hover:bg-[var(--color-icon-sidebar-selected)] text-white font-semibold py-2 px-5 mr-5 rounded-full transition" ${
                            currentStep === 1 ? 'hidden' : ''}`}
                        >
                            <IconArrowRight className="scale-x-[-1] w-6 h-6"></IconArrowRight>
                        </button>
                        {currentStep < 3 && (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full bg-[var(--color-secondary-contrast)] hover:bg-[var(--color-icon-sidebar-selected)] text-white font-semibold py-2 rounded-full transition"
                            >
                                Next
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button
                                type="submit"
                                className="w-full bg-[var(--color-secondary-contrast)] hover:bg-[var(--color-icon-sidebar-selected)] text-white font-semibold py-2 rounded-full transition"
                            >
                                Create your account !
                            </button>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="w-full text-[var(--color-icon-sidebar-unselected)] hover:text-[var(--color-text)] font-semibold py-2 transition"
                    >
                        Log in
                    </button>
            </form>
            </div>
        </div>
        </div>
    </div>
  );
};

export default AccountSetupWizard;