"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardHeader,
CardTitle,
CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Particles from "@/components/effects/particles";
import { Slider } from "@/components/ui/slider";

const capabilityQuestions = [
  {
    key: "literacyLevel",
    question: "What is your current level of reading and writing comfort?",
  },
  {
    key: "visionAccessibility",
    question: "Do you have any visual impairments or need visual accommodations?",
  },
  {
    key: "hearingAccessibility",
    question: "Do you have any hearing challenges or use hearing assistance tools?",
  },
  {
    key: "speechOrCommunication",
    question: "Do you face challenges in verbal or written communication?",
  },
  {
    key: "mobilityNeeds",
    question: "Do you have any mobility limitations or require physical accommodations?",
  },
  {
    key: "cognitiveSupport",
    question: "Do you face difficulties with focus, memory, or cognitive tasks?",
  },
  {
    key: "financialConstraints",
    question: "Are financial limitations affecting your ability to work or train?",
  },
  {
    key: "legalSocialObstacles",
    question: "Are there legal, social, or identity-based challenges you’re navigating?",
  },
  {
    key: "caregivingResponsibilities",
    question: "Do you regularly care for children, elders, or others?",
  },
  {
    key: "digitalConfidence",
    question: "How comfortable are you with using digital tools and technology?",
  },
  {
    key: "workEnvironmentPreference",
    question: "Do you prefer remote, hybrid, or on-site work due to your needs?",
  },
  {
    key: "workScheduleFlexibility",
    question: "Do you require flexible working hours or breaks due to health or life reasons?",
  },
];


const totalSections = 3;

export default function SurveyQuestionMain() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "",
        disability: "",
        wants: "",
        circumstances: "",
        file: null,
        capabilities: capabilityQuestions.reduce((acc, item) => {
        acc[item.key] = 4; 
        return acc;
        }, {}),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCapabilityChange = (key, value) => {
        setFormData((prev) => ({
        ...prev,
        capabilities: { ...prev.capabilities, [key]: value },
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const [naExperience, setNaExperience] = useState(false);
    const [naCircumstances, setNaCircumstances] = useState(false);

    const progress = (step / (totalSections + 2)) * 100;

    return (
        <div className="w-full h-full">
            <div  className="pointer-events-none fixed inset-0 z-[-1] ">
                 <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
            <Card className="w-[500px] h-[600px] bg-amber-100/20 text-amber-100 border border-amber-200/10 shadow-xl mx-auto mt-10">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <Progress value={progress} className="bg-amber-300/50 mt-2 h-2" />
            </CardHeader>

            <CardContent className="flex flex-col justify-between h-[450px]">
                <form onSubmit={handleSubmit} className="space-y-6 h-full">
                {step === 1 && (
                    <div className="space-y-4">
                    <Label>Name</Label>
                    <Input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        required
                    />
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        required
                    />
                    <Label>Password</Label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        required
                    />
                    <Label>Experience</Label>
                    <Textarea
                        name="experience"
                        placeholder="Describe your experience"
                        value={naExperience ? "N/A" : formData.experience}
                        onChange={handleInputChange}
                        disabled={naExperience}
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        checked={naExperience}
                        onCheckedChange={(value) => {
                            setNaExperience(value);
                            setFormData((prev) => ({
                            ...prev,
                            experience: value ? "N/A" : "",
                            }));
                        }}
                        />
                        <span>N/A</span>
                    </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                    <Label>Disability</Label>
                    <Input
                        name="disability"
                        placeholder="Enter your disability (if any)"
                        value={formData.disability}
                        onChange={handleInputChange}
                    />
                    <Label>Wants</Label>
                    <Input
                        name="wants"
                        placeholder="What do you want from the job?"
                        value={formData.wants}
                        onChange={handleInputChange}
                    />
                    <Label>Circumstances</Label>
                    <Textarea
                        name="circumstances"
                        placeholder="Describe your circumstances"
                        value={naCircumstances ? "N/A" : formData.circumstances}
                        onChange={handleInputChange}
                        disabled={naCircumstances}
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        checked={naCircumstances}
                        onCheckedChange={(value) => {
                            setNaCircumstances(value);
                            setFormData((prev) => ({
                            ...prev,
                            circumstances: value ? "N/A" : "",
                            }));
                        }}
                        />
                        <span>N/A</span>
                    </div>
                    </div>
                )}

                {step === 3 && (
                <div className="space-y-4 flex flex-col gap-2">
                    <Label>Capability Assessment (Part 1)</Label>
                    {capabilityQuestions.slice(0, 5).map(({ key, question }) => (
                    <div key={key} className="space-y-1">
                        <Label>{question}</Label>
                        <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[formData.capabilities[key] || 1]}
                        onValueChange={(value) => handleCapabilityChange(key, value[0])}
                        className="w-full"
                        />
                        <p className="text-sm text-amber-300">{formData.capabilities[key] || 1}</p>
                    </div>
                    ))}
                </div>
                )}


                {step === 4 && (
                <div className="space-y-4 flex flex-col gap-2">
                    <Label>Capability Assessment (Part 2)</Label>
                    {capabilityQuestions.slice(5, 10).map(({ key, question }) => (
                    <div key={key} className="space-y-1">
                        <Label>{question}</Label>
                        <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[formData.capabilities[key] || 1]}
                        onValueChange={(value) => handleCapabilityChange(key, value[0])}
                        className="w-full"
                        />
                        <p className="text-sm text-amber-300">{formData.capabilities[key] || 1}</p>
                    </div>
                    ))}
                </div>
                )}



                {step === 5 && (
                    <div className="space-y-4">
                    <Label className="text-amber-100">Upload Medical Certificate or PWD Card</Label>
                    <Input type="file" onChange={handleFileChange} />
                    {formData.file && <p className="text-sm text-gray-500">{formData.file.name}</p>}
                    </div>
                )}
                </form>
            </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                    <Button type="button" onClick={() => setStep(step - 1)} className="w-1/3 bg-amber-300 text-amber-950 cursor-pointer" variant="outline">
                        Previous
                    </Button>
                    ) : (
                    <div className="w-1/3" />
                    )}
                    {step < totalSections + 2 ? (
                    <Button type="button" onClick={() => setStep(step + 1)} className="w-1/3 bg-amber-300 text-amber-950 hover:text-amber-200 hover:bg-amber-800 cursor-pointer">
                        Next
                    </Button>
                    ) : (
                    <Button type="submit" className="w-1/3 bg-amber-300 text-amber-950 hover:text-amber-200 cursor-pointer" onClick={handleSubmit}>
                        <Link href="/homepage">Complete</Link>
                    </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
