// /components/diagnostic/diagnostic-form.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast'; // Import useToast
import { useRouter } from 'next/navigation';
import { submitDiagnosticAction } from '@/app/actions/diagnostic-actions'; // Import a Server Action
import { Loader2 } from 'lucide-react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

// Schema de validação (deve ser consistente com o backend)
const DiagnosticFormSchema = z.object({
  companyName: z.string().min(1, 'Nome da empresa é obrigatório'),
  industry: z.string().min(1, 'Setor é obrigatório'),
  companySize: z.string().min(1, 'Tamanho da empresa é obrigatório'),
  respondentName: z.string().min(1, 'Seu nome é obrigatório'),
  email: z.string().email('Email inválido'),
  position: z.string().min(1, 'Seu cargo é obrigatório'),
  hasWebsite: z.enum(['sim', 'nao'], { required_error: 'Selecione uma opção.' }),
  googleMyBusiness: z.enum(['sim', 'nao'], { required_error: 'Selecione uma opção.' }),
  socialMedia: z.array(z.string()).min(1, 'Selecione ao menos uma rede social.'),
  contentFrequency: z.string({ required_error: 'Selecione a frequência.' }),
  investsDigitalMarketing: z.enum(['sim', 'nao'], { required_error: 'Selecione uma opção.' }),
  marketingBudget: z.string({ required_error: 'Selecione o orçamento.' }),
  marketingChannels: z.array(z.string()).min(1, 'Selecione ao menos um canal.'),
  usesDataForDecisions: z.enum(['sim', 'nao'], { required_error: 'Selecione uma opção.' }),
  trackedMetrics: z.array(z.string()).min(1, 'Selecione ao menos uma métrica.'),
  digitalGoals: z.array(z.string()).min(1, 'Selecione ao menos um objetivo.'),
  mainDigitalChallenge: z.string().optional(),
});

type FormData = z.infer<typeof DiagnosticFormSchema>;

const steps = [
  { id: 1, title: 'Sobre sua Empresa', fields: ['companyName', 'industry', 'companySize', 'respondentName', 'email', 'position'] },
  { id: 2, title: 'Sua Presença Online', fields: ['hasWebsite', 'googleMyBusiness', 'socialMedia', 'contentFrequency'] },
  { id: 3, title: 'Seu Marketing Digital', fields: ['investsDigitalMarketing', 'marketingBudget', 'marketingChannels'] },
  { id: 4, title: 'Seus Dados e Desafios', fields: ['usesDataForDecisions', 'trackedMetrics', 'digitalGoals', 'mainDigitalChallenge'] },
];

const socialMediaOptions = ["Facebook", "Instagram", "LinkedIn", "Twitter", "YouTube", "TikTok", "Outras"];
const marketingChannelsOptions = ["Anúncios Pagos (Google/Social)", "SEO (Busca Orgânica)", "Email Marketing", "Marketing de Conteúdo", "Influenciadores", "Outros"];
const trackedMetricsOptions = ["Tráfego do site", "Leads gerados", "Taxa de conversão", "Custo por aquisição (CAC)", "Retorno sobre Investimento (ROI)", "Engajamento social", "Outras"];
const digitalGoalsOptions = ["Aumentar vendas", "Gerar mais leads", "Fortalecer marca", "Melhorar relacionamento com cliente", "Expandir para novos mercados", "Outros"];


export function DiagnosticForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(DiagnosticFormSchema),
    defaultValues: { // Definir valores padrão para evitar 'uncontrolled input'
        socialMedia: [],
        marketingChannels: [],
        trackedMetrics: [],
        digitalGoals: [],
        mainDigitalChallenge: '',
    }
  });

  const handleNext = async () => {
    const currentFields = steps[currentStep - 1].fields as (keyof FormData)[];
    const isValid = await trigger(currentFields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
        console.log(errors); // Log errors for debugging
        toast({
            title: "Campos Incompletos",
            description: "Por favor, preencha todos os campos obrigatórios antes de avançar.",
            variant: "destructive",
        });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const result = await submitDiagnosticAction(data);

      if (result.success && result.id) {
        toast({
          title: "Diagnóstico Enviado!",
          description: "Seus dados foram processados. Você será redirecionado para seus resultados.",
          variant: "default",
        });
        setSubmissionComplete(true);
        // Redireciona para a página de resultados com o ID retornado
        router.push(`/resultados/${result.id}`);
      } else {
        toast({
          title: "Erro ao Enviar",
          description: result.error || "Ocorreu um erro. Tente novamente.",
          variant: "destructive",
        });
      }
    });
  };

  const progress = (currentStep / steps.length) * 100;

  if (submissionComplete) {
      return (
        <Card className="w-full max-w-2xl mx-auto text-center p-8">
            <CardHeader>
                <CheckCircledIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl font-bold">Diagnóstico Concluído!</CardTitle>
                <CardDescription>Estamos redirecionando você para a sua análise personalizada...</CardDescription>
            </CardHeader>
            <CardContent>
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </CardContent>
        </Card>
      );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Diagnóstico StrateUp - {steps[currentStep - 1].title}</CardTitle>
        <CardDescription>Entenda a maturidade digital da sua PME e descubra como crescer.</CardDescription>
        <Progress value={progress} className="w-full mt-2" />
        <p className="text-sm text-muted-foreground mt-1">Passo {currentStep} de {steps.length}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input id="companyName" {...register('companyName')} />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
              </div>
               <div>
                <Label htmlFor="industry">Setor de Atuação</Label>
                <Input id="industry" {...register('industry')} />
                {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
              </div>
               <div>
                <Label htmlFor="companySize">Tamanho da Empresa</Label>
                 <Controller
                    name="companySize"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger> <SelectValue placeholder="Selecione o tamanho" /> </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1-10">1-10 funcionários</SelectItem>
                                <SelectItem value="11-50">11-50 funcionários</SelectItem>
                                <SelectItem value="51-200">51-200 funcionários</SelectItem>
                                <SelectItem value="200+">Mais de 200 funcionários</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                 />
                {errors.companySize && <p className="text-red-500 text-sm">{errors.companySize.message}</p>}
              </div>
              <div>
                <Label htmlFor="respondentName">Seu Nome</Label>
                <Input id="respondentName" {...register('respondentName')} />
                {errors.respondentName && <p className="text-red-500 text-sm">{errors.respondentName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Seu Email Profissional</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
               <div>
                <Label htmlFor="position">Seu Cargo</Label>
                <Input id="position" {...register('position')} />
                {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
             <div className="space-y-6">
                 <div className="space-y-2">
                    <Label>Sua empresa possui um website?</Label>
                    <Controller name="hasWebsite" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                        </Select>
                    )} />
                    {errors.hasWebsite && <p className="text-red-500 text-sm">{errors.hasWebsite.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label>Utiliza o Google Meu Negócio (GMB) ativamente?</Label>
                    <Controller name="googleMyBusiness" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                        </Select>
                    )} />
                    {errors.googleMyBusiness && <p className="text-red-500 text-sm">{errors.googleMyBusiness.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Quais redes sociais sua empresa utiliza?</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {socialMediaOptions.map((item) => (
                            <Controller key={item} name="socialMedia" control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`social_${item}`}
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item])
                                                    : field.onChange((field.value || []).filter((value) => value !== item));
                                            }}
                                        />
                                        <Label htmlFor={`social_${item}`}>{item}</Label>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                    {errors.socialMedia && <p className="text-red-500 text-sm">{errors.socialMedia.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Com que frequência posta conteúdo?</Label>
                     <Controller name="contentFrequency" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                             <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                             <SelectContent>
                                 <SelectItem value="Diariamente">Diariamente</SelectItem>
                                 <SelectItem value="Algumas vezes por semana">Algumas vezes por semana</SelectItem>
                                 <SelectItem value="Semanalmente">Semanalmente</SelectItem>
                                 <SelectItem value="Quinzenalmente">Quinzenalmente</SelectItem>
                                 <SelectItem value="Mensalmente">Mensalmente</SelectItem>
                                 <SelectItem value="Raramente">Raramente</SelectItem>
                                 <SelectItem value="Não posta">Não posta</SelectItem>
                             </SelectContent>
                         </Select>
                     )} />
                    {errors.contentFrequency && <p className="text-red-500 text-sm">{errors.contentFrequency.message}</p>}
                </div>
             </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Investe em Marketing Digital (Anúncios, Ferramentas, etc)?</Label>
                    <Controller name="investsDigitalMarketing" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                        </Select>
                    )} />
                    {errors.investsDigitalMarketing && <p className="text-red-500 text-sm">{errors.investsDigitalMarketing.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Qual o orçamento MENSAL de marketing digital?</Label>
                    <Controller name="marketingBudget" control={control} render={({ field }) => (
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Não tenho">Não tenho</SelectItem>
                                <SelectItem value="Até R$500">Até R$500</SelectItem>
                                <SelectItem value="R$501-R$1000">R$501 - R$1.000</SelectItem>
                                <SelectItem value="R$1001-R$5000">R$1.001 - R$5.000</SelectItem>
                                <SelectItem value="Acima de R$5000">Acima de R$5.000</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    {errors.marketingBudget && <p className="text-red-500 text-sm">{errors.marketingBudget.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Quais canais de marketing utiliza?</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {marketingChannelsOptions.map((item) => (
                             <Controller key={item} name="marketingChannels" control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`channel_${item}`}
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item])
                                                    : field.onChange((field.value || []).filter((value) => value !== item));
                                            }}
                                        />
                                        <Label htmlFor={`channel_${item}`}>{item}</Label>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                     {errors.marketingChannels && <p className="text-red-500 text-sm">{errors.marketingChannels.message}</p>}
                </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
             <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Utiliza dados e métricas para tomar decisões?</Label>
                    <Controller name="usesDataForDecisions" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent><SelectItem value="sim">Sim</SelectItem><SelectItem value="nao">Não</SelectItem></SelectContent>
                        </Select>
                    )} />
                    {errors.usesDataForDecisions && <p className="text-red-500 text-sm">{errors.usesDataForDecisions.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label>Quais métricas de desempenho acompanha?</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {trackedMetricsOptions.map((item) => (
                             <Controller key={item} name="trackedMetrics" control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`metric_${item}`}
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item])
                                                    : field.onChange((field.value || []).filter((value) => value !== item));
                                            }}
                                        />
                                        <Label htmlFor={`metric_${item}`}>{item}</Label>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                    {errors.trackedMetrics && <p className="text-red-500 text-sm">{errors.trackedMetrics.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label>Quais são seus principais objetivos digitais?</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {digitalGoalsOptions.map((item) => (
                            <Controller key={item} name="digitalGoals" control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`goal_${item}`}
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item])
                                                    : field.onChange((field.value || []).filter((value) => value !== item));
                                            }}
                                        />
                                        <Label htmlFor={`goal_${item}`}>{item}</Label>
                                    </div>
                                )}
                            />
                        ))}
                    </div>
                    {errors.digitalGoals && <p className="text-red-500 text-sm">{errors.digitalGoals.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="mainDigitalChallenge">Qual seu principal desafio digital hoje?</Label>
                    <Textarea id="mainDigitalChallenge" {...register('mainDigitalChallenge')} />
                    {errors.mainDigitalChallenge && <p className="text-red-500 text-sm">{errors.mainDigitalChallenge.message}</p>}
                 </div>
            </div>
          )}

          <CardFooter className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1 || isPending}>
              Voltar
            </Button>
            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext} disabled={isPending}>
                Próximo
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Finalizar Diagnóstico
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
