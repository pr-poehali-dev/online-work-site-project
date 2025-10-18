import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Task {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  timeRequired: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

interface CompletedTask {
  id: number;
  taskId: number;
  title: string;
  amount: number;
  date: string;
}

const Index = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'history' | 'withdraw'>('tasks');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Поставить лайк в Instagram',
      description: 'Подпишитесь на аккаунт и поставьте лайк на последние 3 поста',
      price: 50,
      category: 'Соцсети',
      timeRequired: '2 мин',
      difficulty: 'easy',
      icon: 'Heart'
    },
    {
      id: 2,
      title: 'Написать отзыв о товаре',
      description: 'Напишите честный отзыв о купленном товаре (минимум 100 символов)',
      price: 120,
      category: 'Отзывы',
      timeRequired: '5 мин',
      difficulty: 'easy',
      icon: 'MessageSquare'
    },
    {
      id: 3,
      title: 'Подписаться на Telegram канал',
      description: 'Подпишитесь на указанный канал и оставайтесь подписанными 7 дней',
      price: 80,
      category: 'Соцсети',
      timeRequired: '1 мин',
      difficulty: 'easy',
      icon: 'Send'
    },
    {
      id: 4,
      title: 'Посмотреть видео на YouTube',
      description: 'Просмотрите видео полностью и поставьте лайк',
      price: 60,
      category: 'Видео',
      timeRequired: '3 мин',
      difficulty: 'easy',
      icon: 'Play'
    },
    {
      id: 5,
      title: 'Заполнить опрос',
      description: 'Ответьте на 10 вопросов о потребительских предпочтениях',
      price: 150,
      category: 'Опросы',
      timeRequired: '7 мин',
      difficulty: 'medium',
      icon: 'ClipboardList'
    },
    {
      id: 6,
      title: 'Протестировать приложение',
      description: 'Скачайте приложение, используйте 5 минут и опишите впечатления',
      price: 200,
      category: 'Тестирование',
      timeRequired: '10 мин',
      difficulty: 'medium',
      icon: 'Smartphone'
    }
  ];

  const handleCompleteTask = (task: Task) => {
    const newBalance = balance + task.price;
    const newTotal = totalEarned + task.price;
    
    setBalance(newBalance);
    setTotalEarned(newTotal);
    
    const newCompletedTask: CompletedTask = {
      id: Date.now(),
      taskId: task.id,
      title: task.title,
      amount: task.price,
      date: new Date().toLocaleString('ru-RU')
    };
    
    setCompletedTasks([newCompletedTask, ...completedTasks]);
    
    toast({
      title: `+${task.price} ₽ начислено! 💰`,
      description: `Баланс: ${newBalance} ₽`,
      duration: 3000,
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму",
        variant: "destructive"
      });
      return;
    }
    
    if (amount > balance) {
      toast({
        title: "Недостаточно средств",
        description: `Доступно: ${balance} ₽`,
        variant: "destructive"
      });
      return;
    }
    
    setBalance(balance - amount);
    toast({
      title: "Выплата оформлена! 🎉",
      description: `${amount} ₽ будет переведено в течение 24 часов`,
      duration: 5000,
    });
    setWithdrawAmount('');
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  const difficultyLabels = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="DollarSign" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EasyMoney
                </h1>
                <p className="text-xs text-muted-foreground">Зарабатывай каждый день</p>
              </div>
            </div>
            
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Ваш баланс</p>
                    <p className="text-3xl font-heading font-bold text-primary">{balance} ₽</p>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('withdraw')}
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                  >
                    <Icon name="Wallet" size={18} className="mr-2" />
                    Вывести
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="TrendingUp" size={28} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего заработано</p>
                  <p className="text-2xl font-bold text-primary">{totalEarned} ₽</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Icon name="CheckCircle" size={28} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Выполнено заданий</p>
                  <p className="text-2xl font-bold">{completedTasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon name="Zap" size={28} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Доступно заданий</p>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {[
            { id: 'tasks', label: 'Доступные задания', icon: 'List' },
            { id: 'history', label: 'История', icon: 'History' },
            { id: 'withdraw', label: 'Вывод средств', icon: 'Wallet' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {tasks.map((task, index) => (
              <Card key={task.id} className="border-2 hover:border-primary/50 hover:shadow-xl transition-all animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon name={task.icon as any} size={24} className="text-primary" />
                    </div>
                    <Badge className={difficultyColors[task.difficulty]}>
                      {difficultyLabels[task.difficulty]}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{task.title}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {task.timeRequired}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-4">
                    {task.price} ₽
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
                        <Icon name="Play" size={18} className="mr-2" />
                        Начать задание
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{task.title}</DialogTitle>
                        <DialogDescription>
                          Награда: {task.price} ₽
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-muted-foreground">{task.description}</p>
                        
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Инструкция:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Перейдите по ссылке ниже</li>
                            <li>Выполните указанное действие</li>
                            <li>Сделайте скриншот выполнения</li>
                            <li>Нажмите "Задание выполнено"</li>
                          </ol>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20">
                          <p className="text-sm text-muted-foreground mb-2">Ссылка для выполнения:</p>
                          <div className="flex items-center gap-2">
                            <Input value="https://example.com/task" readOnly className="flex-1" />
                            <Button variant="outline" size="sm">
                              <Icon name="Copy" size={16} />
                            </Button>
                          </div>
                        </div>

                        <Progress value={0} className="h-2" />
                        <p className="text-xs text-center text-muted-foreground">
                          Выполните задание и нажмите кнопку ниже
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleCompleteTask(task)}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                        size="lg"
                      >
                        <Icon name="CheckCircle" size={20} className="mr-2" />
                        Задание выполнено
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            {completedTasks.length === 0 ? (
              <Card className="border-2">
                <CardContent className="py-12 text-center">
                  <Icon name="History" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">История пуста</h3>
                  <p className="text-muted-foreground">Выполните первое задание, чтобы начать зарабатывать</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {completedTasks.map((task, index) => (
                  <Card key={task.id} className="border-2 hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon name="CheckCircle" size={24} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-muted-foreground">{task.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">+{task.amount} ₽</p>
                          <Badge className="bg-green-100 text-green-700 mt-1">Выполнено</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Вывод средств</CardTitle>
                <CardDescription>
                  Минимальная сумма вывода: 100 ₽
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 p-6 rounded-xl border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Доступно к выводу</p>
                  <p className="text-4xl font-bold text-primary mb-4">{balance} ₽</p>
                  <Progress value={(balance / 1000) * 100} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Сумма вывода</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Введите сумму"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="method">Способ вывода</Label>
                    <select className="w-full mt-2 px-3 py-2 border rounded-lg bg-background">
                      <option>Карта Сбербанк</option>
                      <option>ЮMoney</option>
                      <option>QIWI</option>
                      <option>WebMoney</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="details">Реквизиты</Label>
                    <Input
                      id="details"
                      placeholder="Номер карты или кошелька"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    Условия вывода
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Выплаты производятся ежедневно с 10:00 до 18:00</li>
                    <li>• Комиссия платежной системы: 0-3%</li>
                    <li>• Время зачисления: от 1 часа до 24 часов</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleWithdraw}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                  size="lg"
                  disabled={balance < 100}
                >
                  <Icon name="Wallet" size={20} className="mr-2" />
                  Вывести средства
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 bg-card/50">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 EasyMoney. Зарабатывай легко каждый день</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
